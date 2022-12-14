import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React from "react";
import SignIn from "../pages/signin";

const Protected = ({ children }: any) => {
  const { user} = useUser();
  const router = useRouter();
 
 
  return (
    <div>
      {user !== null ||
      router.asPath === "/signup" ||
      router.asPath === "/signin" ||
      router.asPath === "/resetPassword" ||
      router.asPath === "/forgetPassword" ? (
        children
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Protected;
