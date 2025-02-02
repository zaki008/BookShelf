"use client";

import LayoutAuth from "@/components/Layout/LayoutAuth";
import dynamic from "next/dynamic";

const FormLogin = dynamic(() => import("./form-login"), { ssr: false });

const Login = () => {
  return (
    <LayoutAuth>
      <div className="h-screen flex justify-center items-center dark:bg-gray-800">
        <FormLogin />
      </div>
    </LayoutAuth>
  );
};

export default Login;
