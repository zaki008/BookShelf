import { postRegister } from "@/redux/slice/authSlice";
import { resetBookRedux } from "@/redux/slice/bookSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Loading from "@/ui/loading";
import Title from "@/ui/Title";
import { schemaRegister } from "@/utils/ValidationSchema";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(resetBookRedux());
    };
  }, []);

  return (
    <div className="md:w-4/6 lg:w-3/6 p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Title type="form">Register</Title>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={schemaRegister}
        onSubmit={async (values) => {
          const data = {
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
          };
          const result = await dispatch(postRegister(data));
          if (postRegister.fulfilled.match(result)) {
            router.push("/auth/login");
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => {
          return (
            <form className="w-full mx-auto" onSubmit={handleSubmit}>
              <div className="md:grid grid-cols-2 gap-3">
                <Input
                  title="Nama"
                  type="text"
                  placeholder="Input Your Name"
                  name="name"
                  value={values.name}
                  error={errors.name && touched.name ? errors.name : ""}
                  onChange={handleChange}
                />
                <Input
                  title="Username"
                  type="text"
                  placeholder="Input Your Username"
                  name="username"
                  value={values.username}
                  error={
                    errors.username && touched.username ? errors.username : ""
                  }
                  onChange={handleChange}
                />
                <Input
                  title="Email"
                  type="text"
                  placeholder="Input Your Email"
                  name="email"
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
                  error={
                    errors.password && touched.password ? errors.password : ""
                  }
                  onChange={handleChange}
                />
                <Input
                  title="Confirm Password"
                  type="password"
                  placeholder="Confirm Your Password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  error={
                    errors.confirmPassword && touched.confirmPassword
                      ? errors.confirmPassword
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>
              {isLoading ? (
                <Loading classname="mt-2" type="loadBtn" />
              ) : (
                <Button className="mt-2" title={"Submit"} type="submit" />
              )}
            </form>
          );
        }}
      </Formik>

      <Link
        href="/auth/login"
        className="mt-3 inline-flex font-medium items-center text-blue-600 hover:underline text-xs"
      >
        Sudah Punya Akun ? Login
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

export default FormRegister;
