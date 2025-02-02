import * as Yup from "yup";

export const schemaLogin = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
}).required();

export const schemaRegister = Yup.object({
  name: Yup.string().required(),
  username: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "password is must match")
    .required("confirm password Is a required"),
}).required();

export const schemaCreateBook = Yup.object({
  judul: Yup.string().required(),
  penulis: Yup.string().required(),
  isbn: Yup.string().required(),
  cover: Yup.string().required(),
  kategori: Yup.string().required(),
  status: Yup.string().required(),
}).required();

export const schemaEditBook = Yup.object({
  judul: Yup.string().required(),
  penulis: Yup.string().required(),
  isbn: Yup.string().required(),
  kategori: Yup.string().required(),
  status: Yup.string().required(),
}).required();
