"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_PROXY_TARGET ?? "http://127.0.0.1:5001";

type UserRow = {
  id: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
};

function formatDate(value?: string) {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString();
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) {
      setError("Not signed in");
      setLoading(false);
      return;
    }
    setError(null);
    try {
      const res = await fetch(`${API_ORIGIN}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = (await res.json()) as { data?: UserRow[]; error?: string };
      if (res.status === 403) {
        setError("Admin access required");
        setUsers([]);
        return;
      }
      if (!res.ok) {
        setError(json.error ?? "Failed to load users");
        setUsers([]);
        return;
      }
      setUsers(Array.isArray(json.data) ? json.data : []);
    } catch {
      setError("Could not reach the server");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="relative z-10 bg-black pb-16 pt-20 text-white md:pt-24">
      <div className="container-global">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="subtitle text-white/40">Admin</p>
            <h1 className="title mt-2 text-white">All users</h1>
            <p className="description mt-3 max-w-2xl text-white/70">
              Every registered account (passwords are never shown).
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/Pages/admin/home"
              className="buy-button inline-block px-5 py-2 text-xs uppercase tracking-wide"
            >
              Admin home
            </Link>
            <Link
              href="/Pages/admin/products"
              className="primary2-button inline-block px-5 py-2 text-xs uppercase tracking-wide"
            >
              Products
            </Link>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-white/20" aria-hidden />

        {loading ? (
          <p className="description mt-10 text-white/50">Loading users…</p>
        ) : null}

        {error && !loading ? (
          <p className="description mt-10 text-red-300" role="alert">
            {error}
          </p>
        ) : null}

        {!loading && !error ? (
          <div className="mt-10 overflow-x-auto border border-white/15">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/20 bg-white/5">
                  <th className="px-4 py-3 font-medium text-white/80">Email</th>
                  <th className="px-4 py-3 font-medium text-white/80">Role</th>
                  <th className="px-4 py-3 font-medium text-white/80">Joined</th>
                  <th className="px-4 py-3 font-medium text-white/80">Updated</th>
                  <th className="px-4 py-3 font-medium text-white/80">User ID</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-white/50"
                    >
                      No users yet.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-white/10 transition-colors hover:bg-white/5"
                    >
                      <td className="px-4 py-3 text-white">{u.email}</td>
                      <td className="px-4 py-3 capitalize text-white/90">{u.role}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-white/75">
                        {formatDate(u.createdAt)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-white/75">
                        {formatDate(u.updatedAt)}
                      </td>
                      <td className="max-w-[200px] truncate px-4 py-3 font-mono text-xs text-white/50">
                        {u.id}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
