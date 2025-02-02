const BASE_URL = {
  baseApiDev: "http://localhost:3000/api/",
  baseApiProd: "https://book-shelf-project-beryl.vercel.app/api/",
};

const API_HOST =
  process.env.NODE_ENV !== "production"
    ? BASE_URL.baseApiDev
    : BASE_URL.baseApiProd;

export { API_HOST };
