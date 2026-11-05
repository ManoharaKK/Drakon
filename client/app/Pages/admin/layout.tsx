import AdminAuthGuard from "@/app/components/auth/AdminAuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthGuard>{children}</AdminAuthGuard>;
}
