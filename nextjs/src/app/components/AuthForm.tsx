"use client";

import { InputField } from "./InputField";

interface AuthFormProps {
  formType: "login" | "register";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ formType, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-md rounded flex-col space-y-4 bg-[#141414] bg-opacity-90 px-4 py-8 shadow-lg"
    >
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold">
          {formType === "login" ? "Login" : "Register"}
        </h1>
        <p className="text-sm text-gray-500">
          {formType === "login"
            ? "New to the app?"
            : "Already have an account?"}{" "}
          <a
            className="text-red-500 hover:underline"
            href={formType === "login" ? "register" : "login"}
          >
            {formType === "login" ? "Register" : "Login"}
          </a>
        </p>
      </div>
      <div className="mt-8 flex flex-col space-y-4">
        {formType === "register" && (
          <InputField
            id="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
          />
        )}
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        {formType === "register" && (
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
          />
        )}
      </div>
      <div className="flex flex-col-reverse space-y-2 pt-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <button
          type="submit"
          className="flex w-full rounded-lg justify-center bg-red-500 px-4 py-2 text-sm font-semibold text-white sm:w-auto sm-px-8"
        >
          {formType === "login" ? "Login" : "Register"}
        </button>
      </div>
    </form>
  );
};
