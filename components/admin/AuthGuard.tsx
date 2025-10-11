import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthGuard({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }

  return <>{children}</>;
}

