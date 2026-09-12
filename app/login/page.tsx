import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-10">
      <h1 className="mb-1 text-xl font-bold text-slate-900">
        Área do professor
      </h1>
      <p className="mb-6 text-sm text-slate-500">
        Entre com o e-mail cadastrado para gerenciar itens e tags.
      </p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
