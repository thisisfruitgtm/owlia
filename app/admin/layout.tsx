import AuthGuard from "@/components/admin/AuthGuard";
import AdminClientLayout from "@/components/admin/AdminClientLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AdminClientLayout>{children}</AdminClientLayout>
    </AuthGuard>
  );
}

