import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import validateAuthHeader from "@/utils/validateAuthHeader";
import { bookCategory, bookStatus } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string | number } }
) => {
  try {
    const { id } = params;

    const authValidationResult = validateAuthHeader(req);
    if (authValidationResult.status) {
      return Response(authValidationResult);
    }
    const { data } = authValidationResult;

    const book = await prisma.book.findFirst({
      where: {
        username: data?.username,
        id: Number(id),
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
      },
    });

    return Response({
      message: "Get Book By Id Is Successfully",
      data: book,
      status: 200,
    });
  } catch (error) {
    return Response({
      message: "Failed to get Book by id",
      data: error,
      status: 500,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string | number } }
) => {
  try {
    const { id } = params;

    const authValidationResult = validateAuthHeader(req);
    if (authValidationResult.status) {
      return Response(authValidationResult);
    }

    const { data } = authValidationResult;

    const countBook = await prisma.book.count({
      where: {
        username: data?.username,
        id: Number(id),
      },
    });
    if (countBook !== 1) {
      return Response({
        message: "Book Is Not found",
        data: null,
        status: 404,
      });
    }

    await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });
    return Response({
      message: "Book Delete is successfully",
      data: null,
      status: 200,
    });
  } catch (err) {
    return Response({
      message: "Book Delete is failed",
      data: err,
      status: 500,
    });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string | number } }
) => {
  try {
    const { id } = params;

    // Ambil data FormData dari request
    const formData = await req.formData();

    // Ambil data dari FormData
    const isbn = formData.get("isbn") as string;
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const category = formData.get("category") as bookCategory;
    const status = formData.get("status") as bookStatus;
    const coverFile = formData.get("cover") as any;
    const originialcoverFile = formData.get("cover") as any;

    console.log("cover file", coverFile);

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

    let coverUrl = null;
    if (coverFile?.type) {
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

      coverUrl = uploadedFile?.path
        ? `${process.env.SUPABASE_URL}/storage/v1/object/public/bookshef-bucket/${uploadedFile.path}`
        : "";
    }

    const book = await prisma.book.update({
      where: {
        id: Number(id),
      },
      data: {
        isbn,
        title,
        author,
        category,
        status,
        cover: coverUrl ? coverUrl : originialcoverFile,
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
      message: "Book Update is successfully",
      data: book,
      status: 200,
    });
  } catch (err) {
    console.log("error", err);
    return Response({
      message: "Book Update is failed",
      data: err,
      status: 500,
    });
  }
};
