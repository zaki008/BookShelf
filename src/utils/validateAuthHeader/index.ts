import jwt from "jsonwebtoken";

const validateAuthHeader = (req: Request) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return {
      message: "Authorization header missing",
      data: null,
      status: 401,
    };
  }

  const token = authHeader.replace("Bearer ", "");
  const data = jwt.decode(token);

  if (!data || typeof data !== "object" || !("username" in data)) {
    return {
      message: "Invalid token payload",
      data: null,
      status: 403,
    };
  }

  return { data };
};

export default validateAuthHeader;
