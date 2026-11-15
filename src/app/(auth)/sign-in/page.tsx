
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

export default function SignInPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    try {
      setIsLoading(true);

      const { data: resData, error } =
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

      if (error) {
        console.error("Signin error:", error);
        alert(error.message);
        return;
      }

      console.log("Signin successful:", resData);

      alert("Welcome back!");

      router.push("/");
      router.refresh();

    } catch (err) {
      console.error("Something went wrong:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7f2] p-4 md:p-8">

      <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

        {/* Left Side - Branding */}

        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 p-12 text-white md:flex">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />

          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-white/10" />

          <div className="relative z-10">
            <Link href="/" className="text-3xl font-extrabold">
              Bazar<span className="text-lime-300">-Dor</span>
            </Link>

            <p className="mt-3 text-sm text-green-100">
              Your everyday shopping partner.
            </p>
          </div>

          <div className="relative z-10 my-12">

            <div className="mb-8 text-8xl">
              🛍️
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Welcome Back!
              <br />
              Happy Shopping.
            </h1>

            <p className="mt-5 max-w-sm text-lg leading-8 text-green-50">
              Sign in to your Bazar-Dor account and
              continue enjoying a smarter and easier
              shopping experience.
            </p>

            <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-lg font-semibold">
                Good to see you again!
              </p>

              <p className="mt-2 text-sm text-green-100">
                Your favorite shopping experience is
                just one step away.
              </p>
            </div>

          </div>

          <p className="relative z-10 text-sm text-green-100">
            © 2026 Bazar-Dor. All rights reserved.
          </p>

        </section>

        {/* Right Side - Sign In Form */}

        <section className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">

          <div className="mx-auto w-full max-w-md">

            {/* Mobile Logo */}

            <Link
              href="/"
              className="mb-8 block text-2xl font-extrabold text-green-700 md:hidden"
            >
              Bazar<span className="text-lime-500">-Dor</span>
            </Link>

            {/* Heading */}

            <div className="mb-8">

              <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-green-700">
                Welcome Back
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Sign In
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Enter your email and password to access
                your Bazar-Dor account.
              </p>

            </div>

            {/* Form */}

            <Form
              className="flex w-full flex-col gap-5"
              onSubmit={onSubmit}
            >

              {/* Email */}

              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ) {
                    return "Please enter a valid email address";
                  }

                  return null;
                }}
              >

                <Label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </Label>

                <Input
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:bg-white"
                  placeholder="you@example.com"
                />

                <FieldError />

              </TextField>

              {/* Password */}

              <TextField
                isRequired
                name="password"
                type={showPassword ? "text" : "password"}
              >

                <Label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </Label>

                <Input
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:bg-white"
                  placeholder="Enter your password"
                />

                <FieldError />

                <Description className="mt-2 text-xs text-gray-400">
                  Enter the password associated with your account.
                </Description>

              </TextField>

              {/* Show Password and Forgot Password */}

              <div className="flex w-full items-center justify-between">

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>

                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-green-600 hover:text-green-700 hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* Submit Button */}

              <Button
                type="submit"
                isDisabled={isLoading}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 disabled:opacity-60"
              >
                <Check />

                {isLoading ? "Signing In..." : "Sign In"}

              </Button>

              {/* Reset Button */}

              <Button
                type="reset"
                variant="secondary"
                className="w-full rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 hover:bg-gray-50"
              >
                Reset Form
              </Button>

            </Form>

            {/* Sign Up Link */}

            <div className="mt-8 border-t border-gray-100 pt-6 text-center">

              <p className="text-sm text-gray-500">
                Don't have an account?{" "}

                <Link
                  href="/sign-up"
                  className="font-bold text-green-600 hover:text-green-700 hover:underline"
                >
                  Create Account
                </Link>

              </p>

            </div>

            <p className="mt-6 text-center text-xs text-gray-400">
              Secure authentication powered by Better Auth.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}
