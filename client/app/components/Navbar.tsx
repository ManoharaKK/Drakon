"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FormEvent,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { safeInternalPath } from "@/app/components/auth/safeRedirectPath";

type ModalType = "signup" | "login" | null;
type Role = "user" | "admin";
type AuthResponse = { token: string; role: Role; error?: string; details?: string };

const API_ORIGIN = process.env.NEXT_PUBLIC_API_PROXY_TARGET ?? "http://127.0.0.1:5001";

const AUTH_EMAIL_KEY = "auth_email";

function emailInitial(email: string | null): string {
  if (!email) return "?";
  const local = email.split("@")[0] ?? email;
  const ch = local.trim().charAt(0);
  return ch ? ch.toUpperCase() : "?";
}

function isActiveNavPath(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navLinkBase =
  "whitespace-nowrap transition-opacity hover:opacity-80 decoration-white decoration-1 underline-offset-4";
function navLinkClass(href: string, pathname: string): string {
  return `${navLinkBase} ${isActiveNavPath(href, pathname) ? "underline" : ""}`;
}

type MainNavProps = {
  pathname: string;
  isLoggedIn: boolean;
  authRole: Role | null;
  profileEmail: string | null;
  onOpenModal: (modal: "signup" | "login") => void;
};

function MainNav({
  pathname,
  isLoggedIn,
  authRole,
  profileEmail,
  onOpenModal,
}: MainNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="container-global relative h-14 sm:h-16"
      aria-label="Main"
    >
      {/* ── Desktop layout ── */}
      <div className="hidden sm:grid h-full grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex min-w-0 justify-start">
          <Link
            href="/"
            className="shrink-0 text-sm font-semibold tracking-wide transition-opacity hover:opacity-80 sm:text-base"
          >
            DRAKON
          </Link>
        </div>
        <ul className="flex items-center justify-center gap-6 text-sm font-medium sm:text-base">
          <li>
            <Link href="/" className={navLinkClass("/", pathname)} aria-current={isActiveNavPath("/", pathname) ? "page" : undefined}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/Pages/Products" className={navLinkClass("/Pages/Products", pathname)} aria-current={isActiveNavPath("/Pages/Products", pathname) ? "page" : undefined}>
              Products
            </Link>
          </li>
          <li>
            <Link href="/Pages/Workshop" className={navLinkClass("/Pages/Workshop", pathname)} aria-current={isActiveNavPath("/Pages/Workshop", pathname) ? "page" : undefined}>
              Workshop
            </Link>
          </li>
          <li>
            <Link href="/Pages/Contacts" className={navLinkClass("/Pages/Contacts", pathname)} aria-current={isActiveNavPath("/Pages/Contacts", pathname) ? "page" : undefined}>
              Contacts
            </Link>
          </li>
        </ul>
        <ul className="flex min-w-0 items-center justify-end gap-4 text-sm font-medium sm:text-base">
          {isLoggedIn && authRole === "admin" ? (
            <li>
              <Link href="/Pages/admin/home" className={navLinkClass("/Pages/admin", pathname)} aria-current={isActiveNavPath("/Pages/admin", pathname) ? "page" : undefined}>
                Admin
              </Link>
            </li>
          ) : null}
          {!isLoggedIn ? (
            <>
              <li>
                <button type="button" onClick={() => onOpenModal("signup")} className="border border-white px-4 py-1 text-xs uppercase tracking-wide transition-colors hover:bg-white hover:text-black sm:text-sm">
                  Sign Up
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenModal("login")} className="bg-white px-4 py-1 text-xs uppercase tracking-wide text-black transition-opacity hover:opacity-85 sm:text-sm">
                  Login
                </button>
              </li>
            </>
          ) : null}
          {isLoggedIn ? (
            <li>
              <Link href="/Pages/Profile" className={`flex items-center gap-2 ${navLinkClass("/Pages/Profile", pathname)}`} title="Profile" aria-label="Profile" aria-current={isActiveNavPath("/Pages/Profile", pathname) ? "page" : undefined}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-white text-sm font-semibold text-black sm:h-9 sm:w-9" aria-hidden>
                  {emailInitial(profileEmail)}
                </span>
                Profile
              </Link>
            </li>
          ) : null}
        </ul>
      </div>

      {/* ── Mobile layout ── */}
      <div className="flex sm:hidden h-full items-center justify-between px-1">
        <Link href="/" className="text-sm font-semibold tracking-wide transition-opacity hover:opacity-80">
          DRAKON
        </Link>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Link href="/Pages/Profile" aria-label="Profile" className={navLinkClass("/Pages/Profile", pathname)}>
              <span className="flex h-8 w-8 items-center justify-center bg-white text-sm font-semibold text-black" aria-hidden>
                {emailInitial(profileEmail)}
              </span>
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex flex-col justify-center gap-[5px] p-1"
          >
            <span className={`block h-[2px] w-6 bg-white transition-transform duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-6 bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[2px] w-6 bg-white transition-transform duration-200 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 flex flex-col gap-0 border-t border-white/10 bg-black sm:hidden">
          {[
            { href: "/", label: "Home" },
            { href: "/Pages/Products", label: "Products" },
            { href: "/Pages/Workshop", label: "Workshop" },
            { href: "/Pages/Contacts", label: "Contacts" },
            ...(isLoggedIn && authRole === "admin" ? [{ href: "/Pages/admin/home", label: "Admin" }] : []),
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block px-5 py-4 text-sm font-medium tracking-wide border-b border-white/10 transition-colors hover:bg-white/5 ${isActiveNavPath(href, pathname) ? "underline underline-offset-4 decoration-white decoration-1" : ""}`}
              aria-current={isActiveNavPath(href, pathname) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          {!isLoggedIn ? (
            <div className="flex gap-3 px-5 py-4">
              <button type="button" onClick={() => { onOpenModal("signup"); setMenuOpen(false); }} className="flex-1 border border-white py-2 text-xs uppercase tracking-wide transition-colors hover:bg-white hover:text-black">
                Sign Up
              </button>
              <button type="button" onClick={() => { onOpenModal("login"); setMenuOpen(false); }} className="flex-1 bg-white py-2 text-xs uppercase tracking-wide text-black transition-opacity hover:opacity-85">
                Login
              </button>
            </div>
          ) : null}
        </div>
      )}
    </nav>
  );
}

function NavbarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authRole, setAuthRole] = useState<Role | null>(null);
  const [profileEmail, setProfileEmail] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const fetchedEmailRef = useRef(false);

  const stripAuthQueryFromUrl = () => {
    if (searchParams.get("auth") !== "login") return;
    const p = new URLSearchParams(searchParams.toString());
    p.delete("auth");
    p.delete("next");
    p.delete("reason");
    const q = p.toString();
    router.replace(`${pathname}${q ? `?${q}` : ""}`);
  };

  const openModal = (modal: ModalType) => {
    setStatusMessage("");
    setErrorMessage("");
    setShowPassword(false);
    setActiveModal(modal);
  };

  const closeModal = () => {
    setStatusMessage("");
    setErrorMessage("");
    setShowPassword(false);
    setActiveModal(null);
    stripAuthQueryFromUrl();
  };

  const syncAuthFromStorage = useCallback(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("auth_token");
    const role = localStorage.getItem("auth_role");
    const cachedEmail = localStorage.getItem(AUTH_EMAIL_KEY);
    setIsLoggedIn(Boolean(token));
    setAuthRole(role === "admin" || role === "user" ? role : null);
    setProfileEmail(cachedEmail?.trim() ? cachedEmail.trim() : null);
    if (!token) {
      fetchedEmailRef.current = false;
    }
  }, []);

  useEffect(() => {
    syncAuthFromStorage();
  }, [syncAuthFromStorage]);

  useEffect(() => {
    syncAuthFromStorage();
  }, [pathname, syncAuthFromStorage]);

  useEffect(() => {
    if (typeof window === "undefined" || !isLoggedIn) return;
    const token = localStorage.getItem("auth_token");
    const cached = localStorage.getItem(AUTH_EMAIL_KEY);
    if (!token || (cached && cached.trim())) return;
    if (fetchedEmailRef.current) return;
    fetchedEmailRef.current = true;
    let cancelled = false;
    fetch(`${API_ORIGIN}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { user?: { email?: string } } | null) => {
        if (cancelled || !data?.user?.email) return;
        const e = data.user.email.trim();
        localStorage.setItem(AUTH_EMAIL_KEY, e);
        setProfileEmail(e);
      })
      .catch(() => {
        fetchedEmailRef.current = false;
      });
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, pathname]);

  useEffect(() => {
    if (searchParams.get("auth") === "login") {
      setStatusMessage("");
      setErrorMessage("");
      setShowPassword(false);
      setActiveModal("login");
    }
  }, [searchParams]);

  const handleAuthSubmit = async (
    event: FormEvent<HTMLFormElement>,
    mode: "signup" | "login"
  ) => {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
      role: "user" as const,
    };

    if (mode === "signup") {
      const name = String(formData.get("name") ?? "").trim();
      if (!name) {
        setErrorMessage("Name is required");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const endpoint = mode === "signup" ? "/api/auth/register" : "/api/auth/login";
      const response = await fetch(`${API_ORIGIN}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as Partial<AuthResponse>;
      if (!response.ok || !data.token) {
        setErrorMessage(data.error ?? "Authentication failed");
        return;
      }

      localStorage.setItem("auth_token", data.token);
      const resolvedRole: Role = data.role === "admin" ? "admin" : "user";
      localStorage.setItem("auth_role", resolvedRole);
      localStorage.setItem(AUTH_EMAIL_KEY, payload.email);
      setProfileEmail(payload.email);
      setIsLoggedIn(true);
      setAuthRole(resolvedRole);

      const next = safeInternalPath(searchParams.get("next"));
      const wantsAdminRoute = Boolean(next?.includes("/Pages/admin"));

      if (mode === "login" && wantsAdminRoute && resolvedRole !== "admin") {
        setErrorMessage("This area is for admin accounts only.");
        return;
      }

      if (mode === "login" && next && resolvedRole === "admin" && wantsAdminRoute) {
        setStatusMessage("Login successful.");
        form.reset();
        setActiveModal(null);
        stripAuthQueryFromUrl();
        router.replace(next);
        return;
      }

      setStatusMessage(mode === "signup" ? "Sign up successful." : "Login successful.");
      form.reset();
      setTimeout(() => {
        setActiveModal(null);
        stripAuthQueryFromUrl();
      }, 600);
    } catch {
      setErrorMessage("Could not connect to auth server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-black text-white">
      <MainNav
        pathname={pathname}
        isLoggedIn={isLoggedIn}
        authRole={authRole}
        profileEmail={profileEmail}
        onOpenModal={(modal) => openModal(modal)}
      />

      {activeModal ? (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md border border-white/20 bg-black p-5 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="subtitle text-white/45">
                  {activeModal === "signup" ? "Create account" : "Welcome back"}
                </p>
                <h3 className="subtitle mt-2 text-white">
                  {activeModal === "signup" ? "Sample sign up" : "Sample login"}
                </h3>
                {activeModal === "login" && searchParams.get("reason") === "admin" ? (
                  <p className="small-description mt-2 max-w-sm text-white/60">
                    Sign in with an admin account to open the page you requested.
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-white/70 transition-opacity hover:opacity-80"
                aria-label="Close popup"
              >
                ✕
              </button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(event) => handleAuthSubmit(event, activeModal)}
            >
              {activeModal === "signup" ? (
                <div>
                  <label htmlFor="signup-name" className="mb-1 block text-sm text-white/80">
                    Name
                  </label>
                  <input
                    id="signup-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full border border-white/20 bg-black px-3 py-2 text-white outline-none placeholder:text-white/40 focus:border-white/60"
                    required
                  />
                </div>
              ) : null}

              <div>
                <label htmlFor="auth-email" className="mb-1 block text-sm text-white/80">
                  Email
                </label>
                <input
                  id="auth-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-white/20 bg-black px-3 py-2 text-white outline-none placeholder:text-white/40 focus:border-white/60"
                  required
                />
              </div>

              <div>
                <label htmlFor="auth-password" className="mb-1 block text-sm text-white/80">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="auth-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete={activeModal === "signup" ? "new-password" : "current-password"}
                    className="w-full border border-white/20 bg-black py-2 pl-3 pr-18 text-white outline-none placeholder:text-white/40 focus:border-white/60"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center border-l border-white/20 px-3 text-xs uppercase tracking-wide text-white/70 transition-colors hover:text-white"
                    aria-pressed={showPassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" className="primary2-button w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? "Please wait..."
                  : activeModal === "signup"
                    ? "Create account"
                    : "Login"}
              </button>
            </form>

            {statusMessage ? (
              <p className="small-description mt-4 text-white/70">{statusMessage}</p>
            ) : null}
            {errorMessage ? (
              <p className="small-description mt-2 text-red-300">{errorMessage}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function NavbarFallback() {
  const pathname = usePathname();
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-black text-white">
      <MainNav
        pathname={pathname}
        isLoggedIn={false}
        authRole={null}
        profileEmail={null}
        onOpenModal={() => {}}
      />
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarContent />
    </Suspense>
  );
}
