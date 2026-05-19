"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Spinner from "@/app/components/spinner/spinner";

type FormValues = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/auth/signin" });
    }
  }, [session]);

  if (!session?.userinfo?.role && status === "authenticated") {
    router.push("/auth/transition");
  } else if (session?.userinfo?.role) {
    router.push("/home");
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    }).then((res: any) => {
      if (res.status === 401) {
        setError("root.serverError", {
          type: "unauthorized",
          message: "Kredensial anda salah",
        });
      } else if (res.status === 500) {
        setError("root.serverError", {
          type: "serverError",
          message: "Terjadi kesalahan pada server",
        });
      }
    });
  };

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen overflow-x-hidden">
        {/* Left side — decorative image, hidden on mobile */}
        <div className="hidden md:flex md:w-1/2 lg:w-7/12">
          <Image
            src="/bg-login.png"
            alt="Decorative login page image"
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
            priority
          />
        </div>

        {/* Right side — login form */}
        <div className="flex flex-col w-full md:w-1/2 lg:w-5/12 bg-white">
          <section className="flex justify-center items-center w-full min-h-screen px-6 py-10 sm:px-10">
            <div className="flex flex-col w-full max-w-sm">

              {/* Header */}
              <header className="flex items-center gap-4 mb-8">
                <Image
                  src="/logo.png"
                  alt="App logo"
                  className="w-16 h-auto shrink-0"
                  width={200}
                  height={200}
                />
                <div className="flex flex-col">
                  <p className="text-xs text-gray-500">Selamat Datang di K-Owl</p>
                  <h1 className="text-2xl font-bold text-blue-900 mt-1">
                    Silakan Masuk!
                  </h1>
                </div>
              </header>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Username */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="username" className="text-sm font-semibold text-gray-800">
                    Username
                  </label>
                  <input
                    {...register("username")}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="ex: johnDoe"
                    aria-label="Enter your username"
                    required
                    className="w-full h-10 px-3 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="text-sm font-semibold text-gray-800">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      aria-label="Enter your password"
                      required
                      className="w-full h-10 px-3 pr-10 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  {/* Lupa Password link — right aligned */}
                  <div className="flex justify-end mt-1">
                    <Link
                      href="/auth/reset-password"
                      className="text-sm text-blue-900 font-medium hover:underline"
                    >
                      Lupa Password ?
                    </Link>
                  </div>
                </div>

                {/* Server error alerts */}
                {errors.root?.serverError?.type === "unauthorized" && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm"
                    role="alert"
                  >
                    <strong className="font-bold">Oh tidak! </strong>
                    Kredensial anda salah.
                  </div>
                )}
                {errors.root?.serverError?.type === "serverError" && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm"
                    role="alert"
                  >
                    <strong className="font-bold">Oh tidak! </strong>
                    Terjadi kesalahan pada server.
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 mt-2 text-sm font-bold text-white rounded-lg bg-blue-950 hover:bg-blue-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Memproses..." : "Masuk"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-5">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-400 text-sm">atau</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              {/* SSO + Google buttons — side by side like the mockup */}
              <div className="flex gap-3">
                {/* SSO Button */}
                <button
                  onClick={() => signIn("keycloak")}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  <img src="/logo_ui.svg" alt="SSO Logo" className="w-5 h-5 shrink-0" />
                  <span className="truncate">Login dengan SSO</span>
                </button>

                {/* Google Button */}
                <button
                  onClick={() => signIn("google")}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="truncate">Login dengan Google</span>
                </button>
              </div>

              {/* Footer links */}
              <div className="mt-6 space-y-1 text-sm text-center">
                <p>
                  <span className="text-gray-600">Belum punya akun? daftar </span>
                  <Link href="/auth/transition" className="text-blue-900 font-bold hover:underline">
                    di sini
                  </Link>
                </p>
              </div>

            </div>
          </section>
        </div>
      </div>
    );
  }
}