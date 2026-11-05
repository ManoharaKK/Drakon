"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import type { Workshop } from "@/lib/workshops";

function formatMonthYear(month: number, year: number) {
  const label = new Date(year, month - 1, 1).toLocaleString("en-US", {
    month: "long",
  });
  return `${label} · ${year}`;
}

function Section02() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch("/api/workshops")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load workshops");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        const list = json?.data;
        setWorkshops(Array.isArray(list) ? list : []);
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative z-20 bg-black">
      <div className="container-global pt-8 md:pt-16">
       
        <div className="mt-6 flex flex-col gap-4 md:mt-8 md:flex-row md:items-end md:justify-between">
          <h3 className="order-2 heroo-title max-w-2xl text-white md:order-1">
            Workshops we&apos;ve run
          </h3>
          <div className="order-1 flex flex-col self-start md:order-2 md:self-end md:items-end md:pl-8">
            <img
              src="/icons/WhiteArrow.svg"
              alt=""
              width={277}
              height={280}
              className="h-12 w-auto object-contain select-none sm:h-16 md:h-20 md:mb-6"
              aria-hidden
            />
            <p className="description mt-3 max-w-md text-white/70 md:mt-0 md:text-right">
              Past sessions across Sri Lanka — technique, progressions, and community on
              the floor.
            </p>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-white/20" aria-hidden />

        {loading && (
          <p className="mt-10 text-white/50 description">Loading workshops…</p>
        )}
        {error && !loading && (
          <p className="mt-10 text-red-300/90 description" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && workshops.length === 0 && (
          <p className="mt-10 text-white/50 description">No workshops to show yet.</p>
        )}

        {!loading && workshops.length > 0 && (
          <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
            {workshops.map((w) => (
              <li key={w.id}>
                <article className="group flex h-full flex-col overflow-hidden border border-white/15 bg-black transition-colors duration-300 hover:border-white/35">
                  <div className="relative aspect-16/10 overflow-hidden bg-white/5">
                    <Image
                      src={w.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 border-t border-white/10 p-6 md:p-7">
                    <p className="subtitle text-white/45">
                      {formatMonthYear(w.month, w.year)}
                    </p>
                    <h4 className="text-xl font-medium leading-snug text-white md:text-2xl">
                      {w.title}
                    </h4>
                    <p className="small-description mt-1 flex-1 leading-relaxed">
                      {w.description}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Section02;
