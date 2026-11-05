import Link from "next/link";

const actions = [
  {
    href: "/Pages/admin/products",
    title: "Products",
    description:
      "Add and edit catalog items, images, pricing, and stock. This is where your store inventory lives.",
    cta: "Open product manager",
    variant: "primary" as const,
  },
  {
    href: "/Pages/admin/users",
    title: "Users",
    description:
      "View every registered account: email, role, and signup dates. Passwords are never shown.",
    cta: "View all users",
    variant: "secondary" as const,
  },
];

export default function AdminHomePage() {
  return (
    <div className="relative min-h-dvh bg-black pb-20 pt-20 text-white md:pt-24">
      <div className="container-global">
        <nav className="text-sm text-white/45" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-white/80">
            Home
          </Link>
          <span className="mx-2 text-white/25" aria-hidden>
            /
          </span>
          <span className="text-white/70">Admin</span>
        </nav>

        <header className="mt-8 max-w-3xl">
          <p className="subtitle text-white/40">Dashboard</p>
          <h1 className="title mt-3 text-white">Admin control center</h1>
          <p className="description mt-4 text-white/75">
            Manage products and review registered users in one place. Use the cards
            below to jump straight to each area.
          </p>
        </header>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {actions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col border border-white/15 bg-white/3 p-6 transition-colors duration-300 hover:border-white/35 hover:bg-white/5 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="subtitle text-white">{item.title}</h2>
                    <p className="small-description mt-3 leading-relaxed text-white/65">
                      {item.description}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-white/30 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white/60"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
                <span
                  className={`mt-8 inline-flex w-fit items-center px-5 py-2.5 text-xs font-medium uppercase tracking-wide ${
                    item.variant === "primary" ? "primary2-button" : "buy-button"
                  }`}
                >
                  {item.cta}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section
          className="mt-16 border-t border-white/15 pt-12 md:mt-20 md:pt-14"
          aria-labelledby="admin-tips-heading"
        >
          <h2 id="admin-tips-heading" className="subtitle text-white/55">
            Before you start
          </h2>
          <ul className="mt-6 max-w-2xl space-y-3 text-white/70">
            <li className="flex gap-3">
              <span className="text-white/35" aria-hidden>
                ·
              </span>
              <span className="description leading-relaxed">
                Keep one browser session for admin work so your login stays active.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-white/35" aria-hidden>
                ·
              </span>
              <span className="description leading-relaxed">
                Product changes may take a moment to show on the public shop—refresh
                the products page if needed.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-white/35" aria-hidden>
                ·
              </span>
              <span className="description leading-relaxed">
                User roles are set at signup or by your server rules; use the users
                table to audit who has access.
              </span>
            </li>
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/Pages/Products"
              className="text-sm text-white/55 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
            >
              View public store
            </Link>
            <Link
              href="/Pages/Profile"
              className="text-sm text-white/55 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
            >
              Your profile
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
