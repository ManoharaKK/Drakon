"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

type FilterSelectProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  labelMap?: Record<string, string>;
};

function FilterSelect({
  options,
  value,
  onChange,
  labelMap = {},
}: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between border bg-black px-3 py-2 text-left text-sm text-white outline-none focus:outline-none"
      >
        <span>{labelMap[value] ?? value}</span>
        <span aria-hidden>▼</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 w-full border border-white bg-black">
          {options.map((option) => {
            const isActive = option === value;
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-sm ${
                  isActive
                    ? "bg-white text-black"
                    : "bg-black text-white hover:bg-white hover:text-black"
                }`}
              >
                {labelMap[option] ?? option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Shape returned from GET /api/products (Mongoose + toJSON `isNew` alias). */
export type ApiProduct = {
  _id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  discount?: number;
  discountedPrice?: number;
  thumbnail: string;
  images?: string[];
  inStock: boolean;
  isNew?: boolean;
};

const PREVIEW_COUNT = 4;

function Quickcard() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [stock, setStock] = useState("all");
  const [onlyNew, setOnlyNew] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setFetchError(null);

    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        const list = json?.data;
        setProducts(Array.isArray(list) ? list : []);
      })
      .catch((e) => {
        if (!cancelled) {
          setFetchError(e instanceof Error ? e.message : "Failed to load");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categoryOptions = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category?.trim()) set.add(p.category.trim());
    });
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [products]);

  const brandOptions = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.brand?.trim()) set.add(p.brand.trim());
    });
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (brand !== "all" && product.brand !== brand) return false;
      if (stock === "in" && !product.inStock) return false;
      if (stock === "out" && product.inStock) return false;
      if (onlyNew && !product.isNew) return false;
      return true;
    });
  }, [brand, category, onlyNew, products, stock]);

  const previewProducts = useMemo(
    () => filteredProducts.slice(0, PREVIEW_COUNT),
    [filteredProducts]
  );

  const clearFilters = () => {
    setCategory("all");
    setBrand("all");
    setStock("all");
    setOnlyNew(false);
  };

  return (
    <div className="container-global bg-white pb-20 pt-10 lg:pt-20">
        <div className="my-10">
      <h1 className="heroo-title text-black">You may also like</h1>
      <div className="bg-black/30 w-full h-[1px]"></div>
      </div>
      {fetchError && (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {fetchError}
        </p>
      )}

      {loading && (
        <p className="text-sm text-black/70">Loading products…</p>
      )}

      {!loading && !fetchError && products.length === 0 && (
        <p className="text-sm text-black/70">No products in the catalog yet.</p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {!loading &&
          previewProducts.map((product) => {
            const hoverImage = product.images?.[0] ?? product.thumbnail;
            const salePrice =
              product.discountedPrice ?? product.price ?? 0;
            const hasDiscount = (product.discount ?? 0) > 0;

            return (
              <article key={product._id} className="flex flex-col">
                <div className="group relative aspect-square overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-0"
                    style={{
                      backgroundImage: `url(${product.thumbnail})`,
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundImage: `url(${hoverImage})` }}
                  />
                  {product.isNew && (
                    <span className="absolute left-3 top-3 z-10 bg-green-500 px-2 py-1 text-xs text-white">
                      New
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-col">
                  <h3 className="text-lg font-bold text-black">{product.name}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-black">
                      ${Number(salePrice).toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-black/50 line-through">
                        ${Number(product.price).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-1 text-sm ${
                      product.inStock ? "text-green-700" : "text-red-600"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <Link
                    href={`/Pages/Products/${encodeURIComponent(product._id)}`}
                    className="mt-3 flex w-full items-center justify-center border bg-black px-3 py-2 text-center text-xs font-semibold uppercase text-white outline-none transition-colors hover:border-black hover:bg-white hover:text-black focus:outline-none"
                  >
                    Quick View
                  </Link>
                </div>
              </article>
            );
          })}
      </div>

      {!loading && filteredProducts.length > PREVIEW_COUNT && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/Pages/Products"
            className="border bg-black px-6 py-3 text-sm font-semibold uppercase text-white outline-none transition-colors hover:border-black hover:bg-white hover:text-black focus:outline-none"
          >
            Show more
          </Link>
        </div>
      )}

      {!loading && filteredProducts.length === 0 && products.length > 0 && (
        <p className="mt-4 text-sm text-black/70">
          No products match current filters.
        </p>
      )}
    </div>
  );
}

export default Quickcard;
