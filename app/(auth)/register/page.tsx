"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/tasks");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="container max-w-md mx-auto py-10">
      <RegisterForm />
    </div>
  );
}
