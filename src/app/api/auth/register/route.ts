import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import bycript from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const payload = await req.json();

    const data: Prisma.UserCreateInput = {
      name: payload.name,
      email: payload.email,
      username: payload.username,
      password: bycript.hashSync(payload.password, 8),
    };

    const countUser = await prisma.user.count({
      where: {
        username: data.username,
      },
    });

    if (countUser === 1) {
      return Response({
        message: "Username already exists",
        data: countUser,
        status: 400,
      });
    }

    const countEmail = await prisma.user.count({
      where: {
        email: data.email,
      },
    });

    if (countEmail === 1) {
      return Response({
        message: "Email already exists",
        data: countUser,
        status: 400,
      });
    }

    const user = await prisma.user.create({
      data,
    });

    const dataRes: Partial<User> = {
      ...user,
      password: undefined,
    };

    return Response({
      message: "User Registered successfully",
      data: dataRes,
    });
  } catch (error) {
    return Response({
      message: "User Registered failed",
      data: error,
      status: 500,
    });
  }
};
