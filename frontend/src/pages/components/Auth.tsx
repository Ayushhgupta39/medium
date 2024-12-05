import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpInput } from "@ayushgupta39/medium-common";
import FormInput from "@/components/app/FormInput";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { Loader2 } from "lucide-react";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    username: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = type === "signin" ? response.data.jwt : response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.log(
        `Error while making ${type} request`,
        (error as Error).message
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-screen">
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
          <form
            className="space-y-4 w-3/4 flex flex-col"
            onSubmit={sendRequest}
          >
            {type === "signup" && (
              <FormInput
                id="name"
                type="text"
                placeholder="Enter your name"
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
              type="email"
              placeholder="Enter your Email"
              label="Email"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  username: e.target.value,
                }));
              }}
            />

            <FormInput
              id="password"
              type="password"
              label="Password"
              placeholder="••••••"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className="animate-spin" />}
              {type === "signup" ? "Sign Up" : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
