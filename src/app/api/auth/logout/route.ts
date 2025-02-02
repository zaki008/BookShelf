import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import validateAuthHeader from "@/utils/validateAuthHeader";

export const POST = async (req: Request): Promise<Response> => {
  try {
    const authValidationResult = validateAuthHeader(req);
    if (authValidationResult.status) {
      return Response(authValidationResult);
    }
    const { data } = authValidationResult;

    const user = await prisma.user.findUnique({
      where: {
        username: data?.username,
      },
    });

    if (!user) {
      return Response({
        message: "User Not Found",
        data: null,
        status: 404,
      });
    }

    await prisma.user.update({
      where: {
        username: data?.username,
      },
      data: {
        token: null,
      },
      select: {
        username: true,
      },
    });

    return Response({
      message: "User Logout successfuly",
      data: null,
    });
  } catch (error) {
    return Response({
      message: "User Logout failed",
      data: error,
      status: 500,
    });
  }
};
