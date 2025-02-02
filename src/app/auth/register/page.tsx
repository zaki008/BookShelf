"use client";

import LayoutAuth from "@/components/Layout/LayoutAuth";
import dynamic from "next/dynamic";

const FormRegister = dynamic(() => import("./form-register"), { ssr: false });

const Register = () => {
  return (
    <LayoutAuth>
      <div className="h-screen flex justify-center mt-5 items-center dark:bg-gray-800">
        <FormRegister />
      </div>
    </LayoutAuth>
  );
};

export default Register;
