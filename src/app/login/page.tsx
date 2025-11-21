"use client";

import { signIn } from "next-auth/react";

const LoginPage = ({}) => {
  return (
    <div>
      <button type="button" onClick={() => signIn("google")}>
        Google Sign In
      </button>
    </div>
  );
};

export default LoginPage;
