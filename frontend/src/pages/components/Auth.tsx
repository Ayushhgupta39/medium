import { useState } from "react";
import { Link } from "react-router-dom";
import { SignUpInput } from "@ayushgupta39/medium-common";
import FormInput from "@/components/app/FormInput";
import { Button } from "@/components/ui/button";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  return (
    <div className="flex h-screen">
      {/* Left section: Signup Form */}
      <div className="w-full bg-white flex flex-col justify-center p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {type === "signin" ? "Welcome back" : "Create an account"}
        </h2>
        <p className="text-sm mb-6 text-center">
          {type === "signin"
            ? "Dont't have an account"
            : "Already have an account"}
          ?{" "}
          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="text-blue-500"
          >
            {type === "signin" ? "Register" : "Login"}
          </Link>
        </p>
        <div className="w-full flex justify-center">
          <form className="space-y-4 w-3/4 flex flex-col">
            {type === "signup" && (
              <FormInput
                id="name"
                type="text"
                placeholder="Enter your Name"
                label="Name"
                onChange={(e) => {
                  setPostInputs((c) => ({
                    ...c,
                    name: e.target.value,
                  }));
                }}
              />
            )}

            <FormInput
              id="username"
              type="text"
              placeholder="Enter your Username"
              label="Username"
            />

            <FormInput id="password" type="password" label="Password" />
            <Button type="submit">
              {type === "signup" ? "Sign Up" : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
