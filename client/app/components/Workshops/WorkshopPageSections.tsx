import Link from "next/link";
import React from "react";

/** Update these when you publish real contact details */
const WORKSHOP_EMAIL = "kavindamanoharak@gmail.com";
const WORKSHOP_PHONE_DISPLAY = "+94 75 494 7171";
const WORKSHOP_WHATSAPP_HREF = "https://wa.me/94754947171";

const focusAreas = [
  "Strength & conditioning",
  "Street workout fundamentals",
  "Mobility & flexibility",
  "Skill training (pull-ups, muscle-ups, handstands)",
  "Injury prevention & proper form",
];

const whoCanJoin = [
  "Gyms & fitness centers",
  "Schools & universities",
  "Sports teams",
  "Fitness communities",
  "Beginners & advanced athletes",
];

function SectionRule() {
  return <div className="mt-12 h-px w-full bg-white/20 md:mt-16" aria-hidden />;
}

function SectionHeaderWithArrow({
  eyebrow,
  title,
  id,
  titleClassName = "heroo-title",
}: {
  eyebrow: string;
  title: string;
  id?: string;
  /** Defaults to `heroo-title`; use `hero-title` for larger display scale */
  titleClassName?: "heroo-title" | "hero-title";
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="order-2 min-w-0 flex-1 md:order-1 md:max-w-[min(100%,calc(100%-8rem))]">
        <p className="subtitle text-white/40">{eyebrow}</p>
        <h2
          id={id}
          className={`${titleClassName} mt-4 min-w-0 text-pretty text-white`}
        >
          {title}
        </h2>
      </div>
      <div className="order-1 flex shrink-0 flex-col self-start md:order-2 md:self-end md:items-end md:pl-8">
        <img
          src="/icons/WhiteArrow.svg"
          alt=""
          width={277}
          height={280}
          className="h-12 w-auto object-contain select-none sm:h-16 md:h-20"
          aria-hidden
        />
      </div>
    </div>
  );
}

export default function WorkshopPageSections() {
  return (
    <>
      <section
        className="relative z-20 border-t border-white/10 bg-black"
        aria-labelledby="what-we-offer-heading"
      >
        <div className="container-global  pt-8 md:pt-16">
          <SectionHeaderWithArrow
            eyebrow="About workshops"
            title="What we offer"
            id="what-we-offer-heading"
            titleClassName="heroo-title"
          />
          <p className="description mt-8 max-w-3xl text-white/80 md:mt-10">
            Our calisthenics workshops are designed to help individuals and groups
            understand proper techniques, build strength, and improve overall fitness
            using bodyweight training.
          </p>
          <p className="subtitle mt-10 text-white/55">We focus on:</p>
          <ul className="mt-4 max-w-2xl space-y-3 border-l border-white/25 pl-6">
            {focusAreas.map((line) => (
              <li key={line} className="description text-white/85">
                {line}
              </li>
            ))}
          </ul>
          <SectionRule />
        </div>
      </section>

      <section
        className="relative z-20 bg-black"
        aria-labelledby="who-can-join-heading"
      >
        <div className="container-global pt-8 md:pt-16">
          <SectionHeaderWithArrow
            eyebrow="Who is this for"
            title="Who can join?"
            id="who-can-join-heading"
          />
          <p className="description mt-8 max-w-3xl text-white/80 md:mt-10">
            Our workshops are perfect for:
          </p>
          <ul className="mt-6 max-w-2xl space-y-3 border-l border-white/25 pl-6">
            {whoCanJoin.map((line) => (
              <li key={line} className="description text-white/85">
                {line}
              </li>
            ))}
          </ul>
          <SectionRule />
        </div>
      </section>

      <section
        className="relative z-20 bg-black"
        aria-labelledby="collaboration-heading"
      >
        <div className="container-global pt-8 md:pt-16">
          <SectionHeaderWithArrow
            eyebrow="Call for collaboration"
            title="Want a workshop at your gym?"
            id="collaboration-heading"
          />
          <p className="description mt-8 max-w-3xl text-white/80 md:mt-10">
            If you own a gym or manage a fitness space, we can bring a customized
            calisthenics workshop directly to you.
          </p>
          <p className="description mt-4 max-w-3xl text-white/80">
            We&apos;ll handle everything — from training plans to coaching — to give
            your members a unique and powerful experience.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="#book-workshop"
              className="primary2-button inline-block px-8 py-3 text-sm uppercase tracking-wide"
            >
              Schedule a workshop
            </Link>
            <Link
              href="/Pages/Contacts"
              className="buy-button inline-block px-8 py-3 text-sm uppercase tracking-wide"
            >
              Contact us
            </Link>
          </div>
          <SectionRule />
        </div>
      </section>

      <section
        id="book-workshop"
        className="relative z-20 scroll-mt-24 bg-black"
        aria-labelledby="book-workshop-heading"
      >
        <div className="container-global pt-8  md:pt-16 ">
          <SectionHeaderWithArrow
            eyebrow="Contact"
            title="Book a workshop"
            id="book-workshop-heading"
          />
          <p className="description mt-8 max-w-3xl text-white/85 md:mt-10">
            Interested in hosting a calisthenics workshop?
          </p>
          <p className="description mt-4 max-w-2xl text-white/75">
            Contact us through:
          </p>
          <ul className="mt-6 space-y-4">
            <li className="description text-white/90">
              <span className="text-white/50" aria-hidden>
                📧{" "}
              </span>
              <span className="text-white/50">Email: </span>
              <a
                href={`mailto:${WORKSHOP_EMAIL}?subject=Workshop%20inquiry`}
                className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                {WORKSHOP_EMAIL}
              </a>
            </li>
            <li className="description text-white/90">
              <span className="text-white/50" aria-hidden>
                📱{" "}
              </span>
              <span className="text-white/50">WhatsApp: </span>
              <a
                href={WORKSHOP_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                {WORKSHOP_PHONE_DISPLAY}
              </a>
            </li>
          </ul>
          <p className="small-description mt-8 max-w-2xl text-white/60">
            We&apos;ll get back to you with full details, pricing, and availability.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${WORKSHOP_EMAIL}?subject=Book%20a%20workshop`}
              className="primary2-button inline-block px-8 py-3 text-sm uppercase tracking-wide"
            >
              Book now
            </a>
            <Link
              href="/Pages/Contacts"
              className="buy-button inline-block px-8 py-3 text-sm uppercase tracking-wide"
            >
              Let&apos;s train together
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
