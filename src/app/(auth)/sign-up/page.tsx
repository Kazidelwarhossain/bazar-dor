
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    try {
      setIsLoading(true);

      const { data: resData, error } =
        await authClient.signUp.email({
          name: data.name,
          email: data.email,
          password: data.password,
        });

      if (error) {
        console.error("Signup error:", error);
        alert(error.message);
        return;
      }

      console.log("Signup successful:", resData);
      alert("Account created successfully!");

    } catch (err) {
      console.error("Something went wrong:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7f2] flex items-center justify-center p-4 md:p-8">

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl">

        {/* Left Side - Branding */}

        <section className="relative hidden md:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 p-12 text-white">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-white/10" />

          <div className="relative z-10">
            <Link href="/" className="text-3xl font-extrabold tracking-tight">
              Bazar<span className="text-lime-300">-Dor</span>
            </Link>

            <p className="mt-3 text-sm text-green-100">
              Your everyday shopping partner.
            </p>
          </div>

          <div className="relative z-10 my-12">
            <div className="mb-8 text-8xl">🛒</div>

            <h1 className="text-4xl font-bold leading-tight">
              Fresh Choices.
              <br />
              Better Shopping.
            </h1>

            <p className="mt-5 max-w-sm text-lg leading-8 text-green-50">
              Join Bazar-Dor and discover a smarter,
              easier and more convenient way to shop
              for your everyday needs.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-3">
                <div className="h-10 w-10 rounded-full border-2 border-green-600 bg-yellow-200" />
                <div className="h-10 w-10 rounded-full border-2 border-green-600 bg-pink-200" />
                <div className="h-10 w-10 rounded-full border-2 border-green-600 bg-blue-200" />
              </div>

              <p className="text-sm text-green-50">
                A better shopping experience starts here.
              </p>
            </div>
          </div>

          <p className="relative z-10 text-sm text-green-100">
            © 2026 Bazar-Dor. All rights reserved.
          </p>
        </section>

        {/* Right Side - Signup Form */}

        <section className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">

          <div className="mx-auto w-full max-w-md">

            {/* Mobile Logo */}

            <Link
              href="/"
              className="mb-8 block text-2xl font-extrabold text-green-700 md:hidden"
            >
              Bazar<span className="text-lime-500">-Dor</span>
            </Link>

            <div className="mb-8">
              <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-green-700">
                Create your account
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Get Started!
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Create your account and start enjoying
                a smarter shopping experience.
              </p>
            </div>

            <Form
              className="flex w-full flex-col gap-5"
              onSubmit={onSubmit}
            >

              {/* Name */}

              <TextField
                isRequired
                name="name"
                type="text"
              >
                <Label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </Label>

                <Input
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:bg-white"
                  placeholder="Enter your full name"
                />

                <FieldError />
              </TextField>

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
                minLength={8}
                name="password"
                type="password"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }

                  if (!/[A-Z]/.test(value)) {
                    return "Include at least one uppercase letter";
                  }

                  if (!/[0-9]/.test(value)) {
                    return "Include at least one number";
                  }

                  return null;
                }}
              >
                <Label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </Label>

                <Input
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:bg-white"
                  placeholder="Create a strong password"
                />

                <Description className="mt-2 text-xs text-gray-400">
                  Minimum 8 characters, 1 uppercase letter and 1 number.
                </Description>

                <FieldError />
              </TextField>

              {/* Submit */}

              <Button
                type="submit"
                isDisabled={isLoading}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 disabled:opacity-60"
              >
                <Check />
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <Button
                type="reset"
                variant="secondary"
                className="w-full rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 hover:bg-gray-50"
              >
                Reset Form
              </Button>

            </Form>

            {/* Login Link */}

            <div className="mt-8 border-t border-gray-100 pt-6 text-center">

              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-bold text-green-600 hover:text-green-700 hover:underline"
                >
                  Sign in
                </Link>
              </p>

            </div>

            <p className="mt-6 text-center text-xs text-gray-400">
              By creating an account, you agree to our
              {" "}
              <Link href="/terms" className="text-green-600 hover:underline">
                Terms
              </Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-green-600 hover:underline">
                Privacy Policy
              </Link>.
            </p>

          </div>
        </section>
      </div>
    </main>
  );
}
