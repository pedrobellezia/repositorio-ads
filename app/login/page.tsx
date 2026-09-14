import Image from "next/image";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-section px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-accent-border/30 bg-white p-8 shadow-sm">
        <Image
          src="/fmp-logo.png"
          alt="FMP — Faculdade Municipal de Palhoça"
          width={180}
          height={36}
          className="mb-6 h-8 w-auto"
        />
        <h1 className="mb-1 text-xl font-bold text-secondary">
          Área do professor
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          Entre com seu e-mail e senha para gerenciar itens e tags.
        </p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
