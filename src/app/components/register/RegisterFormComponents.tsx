// ─────────────────────────────────────────────────────────────────────────────
// Shared components untuk Register form (Student & Lecturer)
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import * as React from "react";
import { useState } from "react";

// ── Step icons ────────────────────────────────────────────────────────────────
export function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

export function IconGraduation() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
    </svg>
  );
}

export function IconBadgeCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M23 12l-2.44-2.79.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.79-.34 3.68 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.67L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );
}

// ── Stepper ───────────────────────────────────────────────────────────────────
export const REGISTER_STEPS = [
  { label: "Informasi Akun", icon: <IconUser /> },
  { label: "Identitas Pengguna", icon: <IconGraduation /> },
  { label: "Akun Berhasil Dibuat", icon: <IconBadgeCheck /> },
];

export function Stepper({
  current,
  steps = REGISTER_STEPS,
}: {
  current: number;
  steps?: { label: string; icon: React.ReactNode }[];
}) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all
                  ${
                    done || active
                      ? "bg-blue-900 border-blue-900 text-white"
                      : "bg-white border-blue-900 text-blue-900"
                  }`}
              >
                {done ? <IconCheck /> : step.icon}
              </div>
              <span
                className={`text-xs mt-2 whitespace-nowrap ${
                  active ? "text-blue-900 font-semibold" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 w-16 mx-2 mb-8 ${
                  i < current ? "bg-blue-900" : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── Page wrapper ──────────────────────────────────────────────────────────────
export function RegisterPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">
      <img
        src="/transition-bg.png"
        className="absolute inset-0 w-full h-full object-cover"
        alt=""
      />
      <div className="relative w-full max-w-3xl mx-4 my-10 bg-white rounded-2xl shadow-2xl px-10 py-10">
        {children}
      </div>
    </div>
  );
}

// ── Page title ────────────────────────────────────────────────────────────────
export function RegisterTitle() {
  return (
    <div className="text-center mb-2">
      <h1 className="text-2xl font-extrabold text-blue-900 tracking-wide">
        BUAT AKUN
      </h1>
      <p className="text-sm text-blue-700 mt-1">
        Buat akun dan mulai eksplorasi pembelajaran di K-OWL
      </p>
    </div>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="border-b-2 border-blue-900 pb-1 mb-6">
      <span className="text-blue-700 font-semibold text-sm">{label}</span>
    </div>
  );
}

// ── Two-column form layout ────────────────────────────────────────────────────
export function FormSectionLayout({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-8 pt-5 border-t border-gray-200">
      <div className="w-44 shrink-0 pt-1">
        <span className="text-blue-700 font-semibold text-sm leading-tight">
          {label}
        </span>
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
export function FieldWrapper({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-800">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      {children}
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

// ── Text input ────────────────────────────────────────────────────────────────
export const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    valid?: boolean;
    invalid?: boolean;
  }
>(({ valid, invalid, className = "", ...props }, ref) => {
  return (
    <div className="flex items-center gap-2">
      <input
        {...props}
        ref={ref}
        className={`flex-1 h-12 px-4 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition
          ${invalid ? "border-red-300" : "border-gray-300"}
          ${props.disabled ? "bg-gray-50 text-gray-400" : "bg-white"}
          ${className}`}
      />
      {valid && (
        <span className="shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </span>
      )}
      {invalid && (
        <span className="shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm">
          !
        </span>
      )}
    </div>
  );
});
TextInput.displayName = "TextInput";

// ── Password input ────────────────────────────────────────────────────────────
export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    valid?: boolean;
    invalid?: boolean;
  }
>(({ valid, invalid, ...props }, ref) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <input
          {...props}
          ref={ref}
          type={show ? "text" : "password"}
          className={`w-full h-12 px-4 pr-10 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition
            ${invalid ? "border-red-300" : "border-gray-300"} bg-white`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
          tabIndex={-1}
        >
          {show ? "🙈" : "👁️"}
        </button>
      </div>
      {valid && (
        <span className="shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </span>
      )}
      {invalid && (
        <span className="shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm">
          !
        </span>
      )}
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

// ── Server error alert ────────────────────────────────────────────────────────
export function ServerErrorAlert({ message }: { message?: string }) {
  return (
    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
      <strong>Oh tidak! </strong>
      {message ?? "Server sedang bermasalah. Silakan coba lagi nanti."}
    </div>
  );
}

// ── Step 0: Informasi Akun (shared for both student & lecturer) ───────────────
import Link from "next/link";
import {
  UseFormRegister,
  FieldErrors,
  UseFormGetValues,
  UseFormWatch,
} from "react-hook-form";

type BaseFormValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  [key: string]: any;
};

export function StepInformasiAkun<T extends BaseFormValues>({
  register,
  errors,
  getValues,
  watch,
  isAuthenticated,
  emailDisabled,
  usernameDisabled,
  onNext,
  onBatal,
}: {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  getValues: UseFormGetValues<T>;
  watch: UseFormWatch<T>;
  isAuthenticated: boolean;
  emailDisabled?: boolean;
  usernameDisabled?: boolean;
  onNext: () => void;
  onBatal?: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  const watchedEmail = watch("email" as any);
  const watchedUsername = watch("username" as any);
  const watchedPassword = watch("password" as any);
  const watchedConfirm = watch("confirmPassword" as any);

  // Tampilkan error hanya setelah user mencoba klik Selanjutnya
  const showErr = (hasError: boolean) => submitted && hasError;

  const handleNext = () => {
    setSubmitted(true);
    onNext();
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Email */}
      <FieldWrapper
        label="Email"
        required
        error={submitted ? (errors.email?.message as string) : undefined}
      >
        <TextInput
          {...(register as any)("email", {
            required: "Email wajib diisi",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Format email tidak valid",
            },
          })}
          type="email"
          placeholder="ex: mahasiswa@gmail.com"
          disabled={emailDisabled}
          valid={submitted && !!watchedEmail && !errors.email}
          invalid={showErr(!!errors.email)}
        />
      </FieldWrapper>

      {/* Username */}
      <FieldWrapper
        label="Username"
        required
        hint="Username ini akan digunakan untuk login ke akun Anda. Pastikan mudah diingat."
        error={submitted ? (errors.username?.message as string) : undefined}
      >
        <TextInput
          {...(register as any)("username", {
            required: "Username wajib diisi",
            pattern: {
              value: /^\S*$/,
              message: "Username tidak boleh mengandung spasi",
            },
          })}
          type="text"
          placeholder="ex: mahasiswa1"
          disabled={usernameDisabled}
          valid={submitted && !!watchedUsername && !errors.username}
          invalid={showErr(!!errors.username)}
        />
      </FieldWrapper>

      {/* Password — only when unauthenticated */}
      {!isAuthenticated && (
        <>
          <FieldWrapper
            label="Password"
            required
            hint="Minimal 8 karakter mengandung alphanumerik dan karakter spesial (*#?@)"
            error={submitted ? (errors.password?.message as string) : undefined}
          >
            <PasswordInput
              {...(register as any)("password", {
                required: "Password wajib diisi",
                minLength: { value: 8, message: "Password minimal 8 karakter" },
              })}
              placeholder="ex: abc123*#"
              valid={submitted && !!watchedPassword && !errors.password}
              invalid={showErr(!!errors.password)}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Konfirmasi Password"
            required
            error={
              submitted
                ? (errors.confirmPassword?.message as string)
                : undefined
            }
          >
            <PasswordInput
              {...(register as any)("confirmPassword", {
                required: "Konfirmasi password wajib diisi",
                validate: (v: string) =>
                  v === getValues("password" as any) || "Password tidak cocok",
              })}
              placeholder="ex: abc123*#"
              valid={submitted && !!watchedConfirm && !errors.confirmPassword}
              invalid={showErr(!!errors.confirmPassword)}
            />
          </FieldWrapper>
        </>
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        {onBatal ? (
          <button
            type="button"
            onClick={onBatal}
            className="px-8 py-2.5 rounded-lg border-2 border-red-500 text-red-500 font-bold text-sm hover:bg-red-50 transition-colors"
          >
            Batal
          </button>
        ) : (
          <Link href="/auth/signin">
            <button
              type="button"
              className="px-8 py-2.5 rounded-lg border-2 border-red-500 text-red-500 font-bold text-sm hover:bg-red-50 transition-colors"
            >
              Batal
            </button>
          </Link>
        )}
        <button
          type="button"
          onClick={handleNext}
          className="px-8 py-2.5 rounded-lg bg-blue-900 text-white font-bold text-sm hover:bg-blue-800 transition-colors border-2 border-blue-900"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}

// ── Step footer buttons (Kembali + Daftar) ────────────────────────────────────
export function StepFooterButtons({
  onBack,
  isPending,
  submitLabel = "Daftar",
}: {
  onBack: () => void;
  isPending?: boolean;
  submitLabel?: string;
}) {
  return (
    <div className="flex justify-between gap-3 mt-6">
      <button
        type="button"
        onClick={onBack}
        className="px-8 py-2.5 rounded-lg border-2 border-red-500 text-red-500 font-bold text-sm hover:bg-red-50 transition-colors"
      >
        Kembali
      </button>
      <button
        type="submit"
        disabled={isPending}
        className="flex-1 py-2.5 rounded-lg bg-blue-900 text-white font-bold text-sm hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? "Mendaftarkan..." : submitLabel}
      </button>
    </div>
  );
}
