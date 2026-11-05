"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_PROXY_TARGET ?? "http://127.0.0.1:5001";

type MeResponse = { user?: { role?: string } };

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;

      if (!token) {
        const next = encodeURIComponent(pathname || "/Pages/admin/products");
        router.replace(`/?auth=login&reason=admin&next=${next}`);
        if (!cancelled) setReady(true);
        return;
      }

      try {
        const res = await fetch(`${API_ORIGIN}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = (await res.json()) as MeResponse;
        const role = data?.user?.role;

        if (cancelled) return;

        if (!res.ok || role !== "admin") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_role");
          const next = encodeURIComponent(pathname || "/Pages/admin/products");
          router.replace(`/?auth=login&reason=admin&next=${next}`);
          setReady(true);
          return;
        }

        localStorage.setItem("auth_role", "admin");
        setAllowed(true);
        setReady(true);
      } catch {
        if (!cancelled) {
          const next = encodeURIComponent(pathname || "/Pages/admin/products");
          router.replace(`/?auth=login&reason=admin&next=${next}`);
          setReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center bg-black text-white">
        <p className="small-description text-white/60">Checking access…</p>
      </div>
    );
  }

  if (!allowed) {
    return null;
  }
// kdkd
  return <>{children}</>;
}
