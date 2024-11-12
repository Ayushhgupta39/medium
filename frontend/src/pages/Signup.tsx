import React from "react";
import { SignUpQuote } from "./components";

const Signup: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Left section: Signup Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create an account
        </h2>
        <p className="text-sm mb-6 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
        <div className="w-full flex justify-center">
          <form className="space-y-4 w-3/4 flex flex-col">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="m@example.com"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md font-medium"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Right section: Testimonial */}
      <div className="w-1/2 hidden bg-slate-100 md:flex flex-col justify-center items-center p-8">
        <SignUpQuote
          quote={
            "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
          }
        />
      </div>
    </div>
  );
};

export default Signup;
