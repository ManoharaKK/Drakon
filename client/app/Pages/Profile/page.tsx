"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_PROXY_TARGET ?? "http://127.0.0.1:5001";

type MeUser = {
  id: string;
  email: string;
  role: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
};

function formatDate(value?: string) {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString();
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<MeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) {
      const next = encodeURIComponent("/Pages/Profile");
      router.replace(`/?auth=login&next=${next}`);
      setLoading(false);
      return;
    }

    setError(null);
    try {
      const res = await fetch(`${API_ORIGIN}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = (await res.json()) as { user?: MeUser; error?: string };

      if (res.status === 401) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_role");
        const next = encodeURIComponent("/Pages/Profile");
        router.replace(`/?auth=login&next=${next}`);
        return;
      }

      if (!res.ok || !data.user) {
        setError(data.error ?? "Could not load profile");
        setUser(null);
        return;
      }

      setUser(data.user);
      localStorage.setItem("auth_role", data.user.role);
      localStorage.setItem("auth_email", data.user.email);
    } catch {
      setError("Could not reach the server");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  function handleLogout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_role");
    localStorage.removeItem("auth_email");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative z-10 bg-black pt-20 pb-16 text-white md:pt-24">
      <div className="container-global">
        <p className="subtitle text-white/40">Account</p>
        <h1 className="title mt-3 text-white">Your profile</h1>
        <p className="description mt-4 max-w-2xl text-white/75">
          Details from your account. Password is never shown here.
        </p>

        <div className="mt-10 h-px w-full bg-white/20" aria-hidden />

        {loading ? (
          <p className="description mt-10 text-white/50">Loading profile…</p>
        ) : null}

        {error && !loading ? (
          <div className="mt-10 space-y-4">
            <p className="description text-red-300" role="alert">
              {error}
            </p>
            <Link
              href="/"
              className="buy-button inline-block px-6 py-2 text-sm uppercase tracking-wide"
            >
              Back to home
            </Link>
          </div>
        ) : null}

        {!loading && user ? (
          <dl className="mt-10 grid max-w-xl gap-6 border border-white/15 bg-white/3 p-6 sm:p-8">
            <div>
              <dt className="subtitle text-white/45">Email</dt>
              <dd className="description mt-1 text-white">{user.email}</dd>
            </div>
            <div>
              <dt className="subtitle text-white/45">Role</dt>
              <dd className="description mt-1 capitalize text-white">{user.role}</dd>
            </div>
            <div>
              <dt className="subtitle text-white/45">Member since</dt>
              <dd className="description mt-1 text-white/90">
                {formatDate(user.createdAt)}
              </dd>
            </div>
            <div>
              <dt className="subtitle text-white/45">Last updated</dt>
              <dd className="description mt-1 text-white/90">
                {formatDate(user.updatedAt)}
              </dd>
            </div>
            <div>
              <dt className="subtitle text-white/45">User ID</dt>
              <dd className="small-description mt-1 break-all text-white/60">
                {user.id}
              </dd>
            </div>
          </dl>
        ) : null}

        {!loading && user ? (
          <div className="mt-10 max-w-xl">
            <button
              type="button"
              onClick={handleLogout}
              className="buy-button px-8 py-3 text-sm uppercase tracking-wide"
            >
              Log out
            </button>
            <p className="small-description mt-3 text-white/45">
              You will need to sign in again to access your account or admin tools.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
