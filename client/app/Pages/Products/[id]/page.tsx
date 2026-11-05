"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import Quickcard from "@/app/components/Products/Quickcard";
import Section07 from "@/app/components/sections/home/Section07";
import Section08 from "@/app/components/sections/home/Section09";
import Footer from "@/app/components/Footer";

/** Mirrors server `IProduct` / admin form fields from GET /api/products/:id */
type ProductDetail = {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  category?: string;
  brand?: string;
  price: number;
  discount?: number;
  discountedPrice?: number;
  stock?: number;
  rating?: number;
  reviewCount?: number;
  sku?: string;
  thumbnail?: string;
  images?: string[];
  tags?: string[];
  highlights?: string[];
  productDetails?: string[];
  careGuide?: string[];
  inBox?: string[];
  colors?: string[];
  specifications?: {
    handleDiameter?: string;
    handleLength?: string;
    dimensions?: string;
    weight?: string;
  };
  legalSafety?: {
    manufacturer?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
  };
  returns?: {
    policy?: string;
    steps?: string[];
    notes?: string[];
  };
  shipping?: {
    type?: string;
    origin?: string;
    warranty?: string;
    extras?: string[];
  };
  documents?: { name?: string; url?: string }[];
  relatedProducts?: { id?: number; name?: string; slug?: string }[];
  inStock?: boolean;
  /** Mongoose `toJSON` maps `isNewArrival` → `isNew` */
  isNew?: boolean;
  isFeatured?: boolean;
};

const WHATSAPP_NUMBER = '94754947171'

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-black/10 pb-2 text-xs font-semibold uppercase tracking-wide text-black/60">
      {children}
    </h2>
  );
}

function PolicyDisclosure({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <details className="group border border-black/10 bg-neutral-50/80">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 md:px-6 md:py-5 [&::-webkit-details-marker]:hidden">
        <span className="text-left text-xs font-semibold uppercase tracking-wide text-black/60">
          {title}
        </span>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-black/45 transition-transform duration-200 group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="border-t border-black/10 px-4 pb-5 pt-4 md:px-6 md:pb-6">
        {children}
      </div>
    </details>
  );
}

function ListBlock({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-black/80">
      {items.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  );
}

const THUMB_WINDOW = 4;

function ImageCarousel({
  slides,
  productName,
}: {
  slides: string[];
  productName: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [slides]);

  if (slides.length === 0) return null;

  const current = slides[Math.min(index, slides.length - 1)];
  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  };

  /** First thumbnail index in the strip: show at most 4; keep selection visible. */
  const thumbStart =
    slides.length <= THUMB_WINDOW
      ? 0
      : Math.min(
          Math.max(0, index - 1),
          slides.length - THUMB_WINDOW
        );
  const visibleThumbs = slides.slice(thumbStart, thumbStart + THUMB_WINDOW);

  return (
    <div className="space-y-3">
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        <div
          className="h-full w-full bg-cover bg-center transition-opacity duration-300"
          style={{ backgroundImage: `url(${current})` }}
          role="img"
          aria-label={`${productName} — image ${index + 1} of ${slides.length}`}
        />
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-none border border-neutral-200 bg-white/90 text-black shadow-sm transition hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-none border border-neutral-200 bg-white/90 text-black shadow-sm transition hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
            <div
              className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5"
              role="tablist"
              aria-label="Image indicators"
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Image ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    i === index ? "bg-white shadow-sm" : "bg-white/35 hover:bg-white/55"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="w-full overflow-hidden">
          <div className="grid grid-cols-4 gap-2">
            {visibleThumbs.map((src, j) => {
              const i = thumbStart + j;
              return (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`aspect-square w-full min-w-0 bg-cover bg-center transition ${
                    i === index ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundImage: `url(${src})` }}
                  aria-label={`Show image ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const idParam = params?.id;
  const id =
    typeof idParam === "string"
      ? idParam
      : Array.isArray(idParam)
        ? idParam[0]
        : "";

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Missing product id");
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/products/${encodeURIComponent(id)}`)
      .then((res) => {
        if (res.status === 404) throw new Error("Product not found");
        if (!res.ok) throw new Error("Failed to load product");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        const data = json?.data;
        if (!data || typeof data !== "object") {
          setError("Invalid response");
          setProduct(null);
          return;
        }
        setProduct(data as ProductDetail);
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load");
          setProduct(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const salePrice = product?.discountedPrice ?? product?.price ?? 0;
  const hasDiscount = (product?.discount ?? 0) > 0;
  const specs = product?.specifications;
  const hasSpecs =
    specs &&
    [specs.handleDiameter, specs.handleLength, specs.dimensions, specs.weight].some(
      (v) => v && String(v).trim()
    );
  const legal = product?.legalSafety;
  const hasLegal =
    legal &&
    [
      legal.manufacturer,
      legal.address,
      legal.phone,
      legal.email,
      legal.website,
    ].some((v) => v && String(v).trim());

  const gallerySlides = useMemo(() => {
    if (!product) return [];
    const seen = new Set<string>();
    const out: string[] = [];
    const add = (u?: string) => {
      const s = u?.trim();
      if (s && !seen.has(s)) {
        seen.add(s);
        out.push(s);
      }
    };
    add(product.thumbnail);
    (product.images ?? []).forEach(add);
    return out;
  }, [product]);

  return (
    <div className="min-h-screen bg-white  pt-24 text-black">
      <div className="container-global">
        <Link
          href="/Pages/Products"
          className="mb-8 inline-block text-sm font-semibold uppercase tracking-wide text-black underline-offset-4 hover:underline"
        >
          ← Back to products
        </Link>

        {loading && (
          <p className="text-sm text-black/70">Loading product…</p>
        )}

        {error && !loading && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && product && (
          <div className="space-y-16">
            {/* Gallery + scrollable product details */}
            <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
              <div className="space-y-3 lg:sticky lg:top-24 lg:self-start">
                {gallerySlides.length > 0 && (
                  <ImageCarousel
                    key={product._id}
                    slides={gallerySlides}
                    productName={product.name}
                  />
                )}
              </div>

              <div
                className="overflow-x-hidden pr-1 lg:min-h-0 lg:overflow-y-auto lg:pr-3 lg:[scrollbar-gutter:stable]"
                tabIndex={0}
                aria-label="Product details"
              >
                <div className="space-y-6 pb-2">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {product.isFeatured && (
                      <span className="bg-black px-2 py-1 text-xs font-semibold uppercase text-white">
                        Featured
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-green-600 px-2 py-1 text-xs font-semibold uppercase text-white">
                        New
                      </span>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <h1 className="text-3xl font-bold tracking-tight">
                      {product.name}
                    </h1>
                    {product.slug && (
                      <p className="font-mono text-xs text-black/40">
                        {product.slug}
                      </p>
                    )}
                    {product.brand && (
                      <p className="text-sm text-black/60">{product.brand}</p>
                    )}
                    {product.category && (
                      <p className="text-sm text-black/50">{product.category}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-4xl font-bold">
                      ${Number(salePrice).toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <span className="text-lg text-black/45 line-through">
                        ${Number(product.price).toFixed(2)}
                      </span>
                    )}
                    {(product.discount ?? 0) > 0 && (
                      <span className="text-sm font-medium text-green-700">
                        {product.discount}% off
                      </span>
                    )}
                  </div>

                  {(typeof product.rating === "number" && product.rating > 0) ||
                  (typeof product.reviewCount === "number" &&
                    product.reviewCount > 0) ? (
                    <p className="text-sm text-black/60">
                      {typeof product.rating === "number" &&
                        product.rating > 0 && (
                          <span className="font-medium text-black">
                            ★ {product.rating.toFixed(1)}
                          </span>
                        )}
                      {typeof product.reviewCount === "number" &&
                        product.reviewCount > 0 && (
                          <span className="ml-2">
                            ({product.reviewCount} reviews)
                          </span>
                        )}
                    </p>
                  ) : null}

                  <p
                    className={`text-sm font-medium ${
                      product.inStock ? "text-green-700" : "text-red-600"
                    }`}
                  >
                    {product.inStock ? "In stock" : "Out of stock"}
                    {typeof product.stock === "number" && (
                      <span className="ml-2 text-black/60">
                        ({product.stock} available)
                      </span>
                    )}
                  </p>

                  <button
                    type="button"
                    disabled={!product.inStock}
                    onClick={() => {
                      const pageUrl = window.location.href
                      const imageUrl = product.thumbnail
                        ? `${window.location.origin}${product.thumbnail}`
                        : ''
                      const price = `$${Number(salePrice).toFixed(2)}`
                      const message = encodeURIComponent(
                        `Hi DRAKON! 👋 I'd like to buy:\n\n` +
                        `🛒 *${product.name}*\n` +
                        `💰 Price: ${price}${(product.discount ?? 0) > 0 ? ` (${product.discount}% off)` : ''}\n` +
                        (product.brand ? `🏷️ Brand: ${product.brand}\n` : '') +
                        (product.sku ? `📦 SKU: ${product.sku}\n` : '') +
                        `\n🔗 Product page: ${pageUrl}\n` +
                        (imageUrl ? `🖼️ Image: ${imageUrl}\n` : '') +
                        `\nPlease let me know the next steps! 🙏`
                      )
                      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
                    }}
                    className="w-full border border-black bg-black px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-black/30 disabled:bg-black/35 disabled:text-white/80 disabled:hover:bg-black/35 disabled:hover:text-white/80"
                  >
                    Buy product
                  </button>

                  {product.sku && (
                    <p className="text-xs text-black/50">SKU: {product.sku}</p>
                  )}

                  {product.description && (
                    <p className="text-sm leading-relaxed text-black/80">
                      {product.description}
                    </p>
                  )}

                  {product.highlights && product.highlights.length > 0 && (
                    <div>
                      <SectionTitle>Highlights</SectionTitle>
                      <ListBlock items={product.highlights} />
                    </div>
                  )}

                  {product.colors && product.colors.length > 0 && (
                    <div>
                      <SectionTitle>Colors</SectionTitle>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((c) => (
                          <span
                            key={c}
                            className="border border-black/25 px-2 py-1 text-sm text-black/80"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.tags && product.tags.length > 0 && (
                    <div>
                      <SectionTitle>Tags</SectionTitle>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-black/20 px-2 py-0.5 text-xs text-black/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.productDetails &&
                    product.productDetails.length > 0 && (
                      <section>
                        <SectionTitle>Product details</SectionTitle>
                        <ListBlock items={product.productDetails} />
                      </section>
                    )}

                  {hasSpecs && (
                    <section>
                      <SectionTitle>Specifications</SectionTitle>
                      <dl className="grid gap-3 text-sm sm:grid-cols-2">
                        {specs!.handleDiameter?.trim() && (
                          <>
                            <dt className="text-black/50">Handle diameter</dt>
                            <dd className="font-medium">
                              {specs!.handleDiameter}
                            </dd>
                          </>
                        )}
                        {specs!.handleLength?.trim() && (
                          <>
                            <dt className="text-black/50">Handle length</dt>
                            <dd className="font-medium">
                              {specs!.handleLength}
                            </dd>
                          </>
                        )}
                        {specs!.dimensions?.trim() && (
                          <>
                            <dt className="text-black/50">Dimensions</dt>
                            <dd className="font-medium">{specs!.dimensions}</dd>
                          </>
                        )}
                        {specs!.weight?.trim() && (
                          <>
                            <dt className="text-black/50">Weight</dt>
                            <dd className="font-medium">{specs!.weight}</dd>
                          </>
                        )}
                      </dl>
                    </section>
                  )}

                  {product.careGuide && product.careGuide.length > 0 && (
                    <section>
                      <SectionTitle>Care guide</SectionTitle>
                      <ListBlock items={product.careGuide} />
                    </section>
                  )}

                  {product.inBox && product.inBox.length > 0 && (
                    <section>
                      <SectionTitle>In the box</SectionTitle>
                      <ListBlock items={product.inBox} />
                    </section>
                  )}

                  {product.documents && product.documents.length > 0 && (
                    <section>
                      <SectionTitle>Documents</SectionTitle>
                      <ul className="space-y-2 text-sm">
                        {product.documents.map((doc, i) => (
                          <li key={`${doc.url}-${i}`}>
                            {doc.url ? (
                              <a
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium underline-offset-2 hover:underline"
                              >
                                {doc.name || doc.url}
                              </a>
                            ) : (
                              <span>{doc.name}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {product.relatedProducts &&
                    product.relatedProducts.length > 0 && (
                      <section>
                        <SectionTitle>Related products</SectionTitle>
                        <ul className="space-y-2 text-sm">
                          {product.relatedProducts.map((rel, i) => (
                            <li key={rel.id ?? rel.slug ?? i}>
                              <Link
                                href="/Pages/Products"
                                className="underline-offset-2 hover:underline"
                              >
                                {rel.name}
                                {rel.slug ? (
                                  <span className="ml-2 text-black/45">
                                    ({rel.slug})
                                  </span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 text-xs text-black/45">
                          Open the shop to browse all products; related items link
                          to the catalog.
                        </p>
                      </section>
                    )}
                </div>
              </div>
            </div>

            {/* Policy blocks below product section — collapsible */}
            <div className="space-y-3 border-t border-black/10 pt-12">
              {hasLegal && (
                <PolicyDisclosure title="Manufacturer & safety">
                  <dl className="space-y-3 text-sm">
                    {legal!.manufacturer?.trim() && (
                      <div>
                        <dt className="text-black/50">Manufacturer</dt>
                        <dd className="mt-0.5">{legal!.manufacturer}</dd>
                      </div>
                    )}
                    {legal!.address?.trim() && (
                      <div>
                        <dt className="text-black/50">Address</dt>
                        <dd className="mt-0.5">{legal!.address}</dd>
                      </div>
                    )}
                    {legal!.phone?.trim() && (
                      <div>
                        <dt className="text-black/50">Phone</dt>
                        <dd className="mt-0.5">
                          <a
                            href={`tel:${legal!.phone.replace(/\s/g, "")}`}
                            className="underline-offset-2 hover:underline"
                          >
                            {legal!.phone}
                          </a>
                        </dd>
                      </div>
                    )}
                    {legal!.email?.trim() && (
                      <div>
                        <dt className="text-black/50">Email</dt>
                        <dd className="mt-0.5">
                          <a
                            href={`mailto:${legal!.email}`}
                            className="underline-offset-2 hover:underline"
                          >
                            {legal!.email}
                          </a>
                        </dd>
                      </div>
                    )}
                    {legal!.website?.trim() && (
                      <div>
                        <dt className="text-black/50">Website</dt>
                        <dd className="mt-0.5">
                          <a
                            href={legal!.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="break-all underline-offset-2 hover:underline"
                          >
                            {legal!.website}
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                </PolicyDisclosure>
              )}

              {product.returns &&
                (product.returns.policy ||
                  (product.returns.steps &&
                    product.returns.steps.length > 0) ||
                  (product.returns.notes &&
                    product.returns.notes.length > 0)) && (
                  <PolicyDisclosure title="Returns">
                    <div className="space-y-4">
                      {product.returns.policy?.trim() && (
                        <p className="text-sm font-medium text-black/90">
                          {product.returns.policy}
                        </p>
                      )}
                      {product.returns.steps &&
                        product.returns.steps.length > 0 && (
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase text-black/50">
                              Steps
                            </p>
                            <ListBlock items={product.returns.steps} />
                          </div>
                        )}
                      {product.returns.notes &&
                        product.returns.notes.length > 0 && (
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase text-black/50">
                              Notes
                            </p>
                            <ListBlock items={product.returns.notes} />
                          </div>
                        )}
                    </div>
                  </PolicyDisclosure>
                )}

              {product.shipping &&
                (product.shipping.type ||
                  product.shipping.origin ||
                  product.shipping.warranty ||
                  (product.shipping.extras &&
                    product.shipping.extras.length > 0)) && (
                  <PolicyDisclosure title="Shipping">
                    <dl className="space-y-3 text-sm">
                      {product.shipping.type?.trim() && (
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                          <dt className="w-40 shrink-0 text-black/50">
                            Type
                          </dt>
                          <dd>{product.shipping.type}</dd>
                        </div>
                      )}
                      {product.shipping.origin?.trim() && (
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                          <dt className="w-40 shrink-0 text-black/50">
                            Origin
                          </dt>
                          <dd>{product.shipping.origin}</dd>
                        </div>
                      )}
                      {product.shipping.warranty?.trim() && (
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                          <dt className="w-40 shrink-0 text-black/50">
                            Warranty
                          </dt>
                          <dd>{product.shipping.warranty}</dd>
                        </div>
                      )}
                    </dl>
                    {product.shipping.extras &&
                      product.shipping.extras.length > 0 && (
                        <div className="mt-4 border-t border-black/10 pt-4">
                          <p className="mb-2 text-xs font-semibold uppercase text-black/50">
                            Additional
                          </p>
                          <ListBlock items={product.shipping.extras} />
                        </div>
                      )}
                  </PolicyDisclosure>
                )}
            </div>
          </div>
        )}
        
      </div>
      <Quickcard />
      <Section07 />
      <Section08 />
      <Footer />
    </div>
  );
}
