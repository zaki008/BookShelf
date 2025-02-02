import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import validateAuthHeader from "@/utils/validateAuthHeader";
import { bookCategory, bookStatus } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const query = req.nextUrl.searchParams;
    const page = query.get("page") ? parseInt(query.get("page") as string) : 1;
    const size = query.get("size") ? parseInt(query.get("size") as string) : 10;
    const title = query.get("title") ? query.get("title") : "";
    const status = query.get("status") ? query.get("status") : "";

    const authValidationResult = validateAuthHeader(req);
    if (authValidationResult.status) {
      return Response(authValidationResult);
    }
    const { data } = authValidationResult;
    const skip = (page - 1) * size;

    const filter = [];

    if (title) {
      filter.push({
        title: {
          contains: title,
        },
      });
    }

    if (status) {
      filter.push({
        status: {
          equals: status as bookStatus,
        },
      });
    }

    const books = await prisma.book.findMany({
      where: {
        AND: filter,
        username: data?.username,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: size,
      skip: skip,
    });

    const totalItems = await prisma.book.count({
      where: {
        username: data?.username,
      },
    });

    const [countTotalBook, countCompletedBook, countUnReadBook, countReadBook] =
      await Promise.all([
        prisma.book.count({
          where: { username: data?.username },
        }),
        prisma.book.count({
          where: { username: data?.username, status: "completed" },
        }),
        prisma.book.count({
          where: { username: data?.username, status: "unread" },
        }),
        prisma.book.count({
          where: { username: data?.username, status: "read" },
        }),
      ]);

    const count = {
      totalBook: countTotalBook,
      complatedBook: countCompletedBook,
      unReadBook: countUnReadBook,
      countReadBook: countReadBook,
    };

    return Response({
      message: "Get All Books",
      data: {
        paging: {
          size: size,
          page: page,
          total_item: totalItems,
          total_page: Math.ceil(totalItems / size),
        },
        data: books,
        countBook: count,
      },
      status: 200,
    });
  } catch (error) {
    return Response({
      message: "Failed to get Books",
      data: error,
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    // Ambil data FormData dari request
    const formData = await req.formData();

    // Ambil data dari FormData
    const isbn = formData.get("isbn") as string;
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const category = formData.get("category") as bookCategory;
    const status = formData.get("status") as bookStatus;
    const coverFile = formData.get("cover") as File;

    if (!coverFile) {
      return Response({
        message: "Cover image is required",
        status: 400,
      });
    }

    // Validate authorization header
    const authValidationResult = validateAuthHeader(req);
    if (authValidationResult.status) {
      return Response({
        message: authValidationResult.message,
        data: null,
        status: 401,
      });
    }

    const { data } = authValidationResult;

    // Baca file cover ke dalam buffer
    const buffer = await coverFile.arrayBuffer();

    const randomNumber = Math.floor(Math.random() * 1000000);
    const fileExtension = coverFile.name.endsWith(".jpg") ? ".jpg" : ".png";
    const filename = `cover_${randomNumber}${fileExtension}`;

    // Upload ke Supabase Storage
    const { data: uploadedFile, error } = await supabase.storage
      .from("bookshef-bucket")
      .upload(filename, Buffer.from(buffer), {
        contentType: coverFile.type || "image/jpeg",
        upsert: true,
      });

    if (error) {
      return Response({
        message: "Error uploading cover image",
        data: error.message,
        status: 400,
      });
    }

    const coverUrl = uploadedFile?.path
      ? `${process.env.SUPABASE_URL}/storage/v1/object/public/bookshef-bucket/${uploadedFile.path}`
      : "";

    const countIsbn = await prisma.book.count({
      where: { isbn },
    });

    if (countIsbn === 1) {
      return Response({
        message: "ISBN already exists",
        status: 400,
      });
    }

    const book = await prisma.book.create({
      data: {
        isbn,
        title,
        author,
        category,
        status,
        cover: coverUrl,
        username: data?.username,
      },
      select: {
        id: true,
        title: true,
        author: true,
        isbn: true,
        cover: true,
        category: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return Response({
      message: "Book Created successfully",
      data: book,
      status: 201,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    return Response({
      message: "Book Creation failed",
      data: error,
      status: 500,
    });
  }
};
