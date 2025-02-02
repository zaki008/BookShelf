import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import bycript from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

export const POST = async (req: Request) => {
  try {
    const payload = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      return Response({
        message: "Username or password is wrong",
        data: null,
        status: 401,
      });
    }

    const isPassword = await bycript.compare(payload.password, user.password);
    if (!isPassword) {
      return Response({
        message: "Username or password is wrong",
        data: null,
        status: 401,
      });
    }

    const secretKey = uuid().toString();
    const payloadJwt = {
      name: user.name,
      username: user.username,
    };

    const token = jwt.sign(payloadJwt, secretKey, { expiresIn: "1h" });

    const dataRes = await prisma.user.update({
      data: {
        token: token,
      },
      where: {
        username: user.username,
      },
      select: {
        token: true,
      },
    });

    return Response({
      message: "User login successful",
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
