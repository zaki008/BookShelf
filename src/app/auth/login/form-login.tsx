import { postLogin } from "@/redux/slice/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Loading from "@/ui/loading";
import Title from "@/ui/Title";
import { schemaLogin } from "@/utils/ValidationSchema";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const FormLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  return (
    <div className="w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Title type="form">Login</Title>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={schemaLogin}
        onSubmit={async (values) => {
          const data = {
            email: values.email,
            password: values.password,
          };
          const result = await dispatch(postLogin(data));
          if (postLogin.fulfilled.match(result)) {
            router.push("/");
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => {
          return (
            <form className="w-full mx-auto" onSubmit={handleSubmit}>
              <Input
                title="Email"
                type="text"
                name="email"
                placeholder="Input Your Email"
                value={values.email}
                error={errors.email && touched.email ? errors.email : ""}
                onChange={handleChange}
              />
              <Input
                title="Password"
                type="password"
                placeholder="Input Your Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={
                  errors.password && touched.password ? errors.password : ""
                }
              />
              {isLoading ? (
                <Loading type="loadBtn" classname="mt-2" />
              ) : (
                <Button className="mt-2" title={"Submit"} type="submit" />
              )}
            </form>
          );
        }}
      </Formik>

      <Link
        href="/auth/register"
        className="mt-3 inline-flex font-medium items-center text-blue-600 hover:underline text-xs"
      >
        Belum Punya Akun ? Daftar
        <svg
          className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        ></svg>
      </Link>
    </div>
  );
};

export default FormLogin;
