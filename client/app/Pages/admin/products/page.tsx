'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import productCatalog from '@/app/components/Products/product.json';

const MAX_GALLERY_IMAGES = 6;
const BRAND = 'DRAKON';
const CATEGORY = 'Calisthenics';
const SUPPORT_EMAIL = 'kavindamanoharak@gmail.com';
const RETURNS_POLICY = 'Return within 30 days (no reason needed)';

/** Fixed returns steps & notes from catalog (same as product.json). */
const RETURNS_STEPS: string[] = (() => {
  const steps = productCatalog.products[0]?.returns?.steps;
  if (Array.isArray(steps) && steps.length > 0) {
    return steps.map((s) => String(s));
  }
  return [
    'Go to Returns Portal',
    'Enter order number and email',
    'Receive instructions via email',
  ];
})();

const RETURNS_NOTES: string[] = (() => {
  const notes = productCatalog.products[0]?.returns?.notes;
  if (Array.isArray(notes) && notes.length > 0) {
    return notes.map((s) => String(s));
  }
  return [
    'Customer covers return shipping',
    'Use tracked shipping',
    'Upload photo if item is damaged',
  ];
})();

/** Shared styling for “one per line” list fields (highlights, details, care, in-box). */
const LIST_TEXTAREA_CLASS =
  'min-h-[104px] w-full resize-y border border-white/10 bg-white/5 px-3 py-2.5 text-sm leading-relaxed text-white placeholder:text-white/30 outline-none transition-[border-color,box-shadow] focus:border-white/25 focus:outline-none focus:ring-1 focus:ring-white/15';

function splitLines(text: string) {
  return text
    .split(/\r?\n|,/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseDocs(text: string) {
  // Format: "name|url" per line
  return text
    .split(/\r?\n/g)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, url] = line.split('|').map((s) => s.trim());
      return { name, url };
    })
    .filter((d) => d.name && d.url);
}

function parseRelatedProducts(text: string) {
  // Format: "id|name|slug" per line
  return text
    .split(/\r?\n/g)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [idRaw, name, slug] = line.split('|').map((s) => s.trim());
      const id = Number(idRaw);
      return { id, name, slug };
    })
    .filter((p) => p.id && p.name && p.slug);
}

/** Uppercase slug from product name for SKU prefix (A–Z, 0–9, dashes). */
function skuSlugFromName(name: string): string {
  const s = name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  return s || 'PRODUCT';
}

const SUGGESTED_TAGS = Array.from(
  new Set(
    productCatalog.products.flatMap((p) => p.tags ?? [])
  )
).sort((a, b) => a.localeCompare(b));

const SUGGESTED_COLORS = Array.from(
  new Set(
    productCatalog.products.flatMap((p) => p.colors ?? [])
  )
).sort((a, b) => a.localeCompare(b));

/** Standard shipping copy from catalog (read-only in admin). */
const DEFAULT_SHIPPING = (() => {
  const s = productCatalog.products[0]?.shipping;
  if (s && typeof s.type === 'string') {
    return {
      type: s.type,
      origin: s.origin ?? '',
      warranty: s.warranty ?? '',
    };
  }
  return {
    type: 'Fast & Secure Shipping',
    origin: 'Designed in Sri Lanka',
    warranty: '2 Years Warranty',
  };
})();

function normalizeTag(raw: string) {
  return raw.trim().toLowerCase();
}

/** Match catalog casing (e.g. "black" → "Black") or keep custom text. */
function resolveColorName(raw: string) {
  const t = raw.trim();
  if (!t) return '';
  const fromCatalog = SUGGESTED_COLORS.find(
    (c) => c.toLowerCase() === t.toLowerCase()
  );
  return fromCatalog ?? t;
}

function nextSkuSuffix() {
  return String(Math.floor(10000 + Math.random() * 90000));
}

export default function AddProductForm() {
  /** Empty until client mount — avoids SSR/client `Math.random()` hydration mismatch. */
  const [skuSuffix, setSkuSuffix] = useState('');

  const [form, setForm] = useState({
    // Required by Mongoose schema
    name: '',

    description: '',
    price: '',
    stock: '',

    // Optional primitives
    discount: '',
    rating: '',
    reviewCount: '',

    // Media
    thumbnailFile: null as File | null,
    images: [] as File[],

    // Lists
    tags: [] as string[],
    highlightsText: '',
    productDetailsText: '',
    careGuideText: '',
    inBoxText: '',
    colors: [] as string[],

    // Specs
    handleDiameter: '',
    handleLength: '',
    dimensions: '',
    weight: '',

    // Safety / returns / shipping
    manufacturer: '',
    address: '',
    phone: '',
    website: '',

    /** Optional extra shipping lines (standard type / origin / warranty are fixed). */
    shippingExtras: [] as string[],

    // Documents / related
    documentsText: '',
    relatedProductsText: '',

    // Flags
    isNewArrival: false,
    isFeatured: false,
    inStockFlag: true,
  });

  const [message, setMessage] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    setSkuSuffix(nextSkuSuffix());
  }, []);

  useEffect(() => {
    const urls = form.images.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [form.images]);

  useEffect(() => {
    if (!form.thumbnailFile) {
      setThumbnailPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(form.thumbnailFile);
    setThumbnailPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [form.thumbnailFile]);

  const removeGalleryImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  /** Discount is a percentage (0–100). Matches product.json: price × (1 − discount/100). */
  const discountedPriceComputed = useMemo(() => {
    const p = Number(form.price);
    const dRaw = Number(form.discount);
    if (form.price.trim() === '' || Number.isNaN(p) || p < 0) return null;
    if (form.discount.trim() === '' || Number.isNaN(dRaw) || dRaw < 0) return null;
    const d = Math.min(100, Math.max(0, dRaw));
    return Math.round(p * (1 - d / 100) * 100) / 100;
  }, [form.price, form.discount]);

  const skuComputed = useMemo(() => {
    const base = skuSlugFromName(form.name);
    return skuSuffix ? `${base}-${skuSuffix}` : `${base}-…`;
  }, [form.name, skuSuffix]);

  const suggestedTagsAvailable = useMemo(
    () =>
      SUGGESTED_TAGS.filter(
        (t) => !form.tags.some((x) => x.toLowerCase() === t.toLowerCase())
      ),
    [form.tags]
  );

  const commitTagInput = () => {
    const n = normalizeTag(tagInput);
    if (!n) return;
    setForm((prev) => {
      if (prev.tags.some((t) => t.toLowerCase() === n)) return prev;
      return { ...prev, tags: [...prev.tags, n] };
    });
    setTagInput('');
  };

  const removeTagAt = (index: number) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const suggestedColorsAvailable = useMemo(
    () =>
      SUGGESTED_COLORS.filter(
        (c) => !form.colors.some((x) => x.toLowerCase() === c.toLowerCase())
      ),
    [form.colors]
  );

  const commitColorInput = () => {
    const resolved = resolveColorName(colorInput);
    if (!resolved) return;
    setForm((prev) => {
      if (
        prev.colors.some((c) => c.toLowerCase() === resolved.toLowerCase())
      ) {
        return prev;
      }
      return { ...prev, colors: [...prev.colors, resolved] };
    });
    setColorInput('');
  };

  const removeColorAt = (index: number) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setLoading(true);
    setMessage('');

    try {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const payload = {
        name: form.name.trim(),
        category: CATEGORY,
        brand: BRAND,
        sku: `${skuSlugFromName(form.name)}-${skuSuffix || nextSkuSuffix()}`,
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),

        discount: form.discount === '' ? 0 : Number(form.discount),
        discountedPrice:
          discountedPriceComputed === null ? undefined : discountedPriceComputed,
        rating: form.rating === '' ? 0 : Number(form.rating),
        reviewCount: form.reviewCount === '' ? 0 : Number(form.reviewCount),

        tags: form.tags,
        highlights: splitLines(form.highlightsText),
        productDetails: splitLines(form.productDetailsText),

        specifications: {
          handleDiameter: form.handleDiameter,
          handleLength: form.handleLength,
          dimensions: form.dimensions,
          weight: form.weight,
        },
        careGuide: splitLines(form.careGuideText),
        inBox: splitLines(form.inBoxText),

        legalSafety: {
          manufacturer: form.manufacturer,
          address: form.address,
          phone: form.phone,
          email: SUPPORT_EMAIL,
          website: form.website,
        },

        returns: {
          policy: RETURNS_POLICY,
          steps: RETURNS_STEPS,
          notes: RETURNS_NOTES,
        },

        shipping: {
          type: DEFAULT_SHIPPING.type,
          origin: DEFAULT_SHIPPING.origin,
          warranty: DEFAULT_SHIPPING.warranty,
          extras: form.shippingExtras
            .map((s) => s.trim())
            .filter(Boolean),
        },

        documents: parseDocs(form.documentsText),
        relatedProducts: parseRelatedProducts(form.relatedProductsText),

        colors: form.colors,

        isNewArrival: form.isNewArrival,
        isFeatured: form.isFeatured,
        inStock: form.inStockFlag,
      };

      const formData = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });

      if (form.thumbnailFile) {
        formData.append('thumbnail', form.thumbnailFile);
      }
      form.images.forEach((file) => {
        formData.append('images', file);
      });

      const res = await fetch('/api/products', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setMessage('✅ Product added successfully!');
        if (imagesInputRef.current) imagesInputRef.current.value = '';
        if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
        setSkuSuffix(nextSkuSuffix());
        setTagInput('');
        setColorInput('');
        setForm({
          name: '',
          description: '',
          price: '',
          stock: '',
          discount: '',
          rating: '',
          reviewCount: '',
          thumbnailFile: null,
          images: [],
          tags: [],
          highlightsText: '',
          productDetailsText: '',
          careGuideText: '',
          inBoxText: '',
          colors: [],
          handleDiameter: '',
          handleLength: '',
          dimensions: '',
          weight: '',
          manufacturer: '',
          address: '',
          phone: '',
          website: '',
          shippingExtras: [],
          documentsText: '',
          relatedProductsText: '',
          isNewArrival: false,
          isFeatured: false,
          inStockFlag: true,
        });
      } else {
        setMessage(`❌ ${typeof data.message === 'string' ? data.message : 'Request failed'}`);
      }
    } catch (err) {
      if ((err as any)?.name === 'AbortError') return;
      setMessage('❌ Network error — is the API running?');
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  return (
    <div className='relative z-20 bg-white/10'>
    <div className='container-global py-8 md:py-26'>
        <div className=''>
        <h1 className="text-2xl font-bold uppercase tracking-wide">Add product</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6 border border-white/10 p-6">
          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase">Basics</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className="w-full  bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
               
              />
              <div
                className="flex w-full items-center justify-between border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90"
                aria-label="category"
                >
                <span className="text-white/50">Category</span>
                <span className="font-medium">{CATEGORY}</span>
              </div>
              <div
                className="flex w-full items-center justify-between border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90"
                aria-label="Brand"
              >
                <span className="text-white/50">Brand</span>
                <span className="font-medium">{BRAND}</span>
              </div>
              <div
                className="flex w-full flex-col gap-1 border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90"
                aria-label="SKU (auto-generated)"
              >
                <span className="text-xs text-white/50">SKU</span>
                <span className="break-all font-mono text-xs font-medium leading-snug">
                  {skuComputed}
                </span>
              </div>
              <div className='flex flex-row gap-2'>
              <input
                className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <input
                className="w-full border border-white/10 bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Discount (%)"
                type="number"
                min={0}
                max={100}
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
              />
              <div
                className="w-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90"
                aria-live="polite"
              >
                <span className="block text-xs text-white/50">Discounted price</span>
                <span className="font-medium tabular-nums">
                  {discountedPriceComputed !== null
                    ? discountedPriceComputed.toFixed(2)
                    : '—'}
                </span>
              </div>
              </div>
              <div className="">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/80">
                  Stock quantity
                </span>
                <input
                  className="w-full bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Stock"
                  type="number"
                  min={0}
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
                 </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/80">
                    Availability
                  </span>
                  <div
                    className="flex w-full max-w-md border border-white/10"
                    role="group"
                    aria-label="Stock availability"
                  >
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, inStockFlag: true }))}
                      className={`flex-1 px-3 py-2 text-xs font-semibold uppercase transition-colors ${
                        form.inStockFlag
                          ? 'bg-white text-black'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      In stock
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, inStockFlag: false }))}
                      className={`flex-1 border-l border-white/10 px-3 py-2 text-xs font-semibold uppercase transition-colors ${
                        !form.inStockFlag
                          ? 'bg-white text-black'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      Out of stock
                    </button>
                  </div>
                </div>
             
            </div>
            
            <textarea
              className="w-full bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
             
              rows={4}
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase">Media</h2>
            <div className="space-y-6 border border-white/10 p-4 md:p-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-white/80">
                    Thumbnail (optional)
                  </h3>
                  <p className="text-xs text-white/50">
                    Upload a single image for the product card. If you skip this, the first gallery image is used as the thumbnail.
                  </p>
                </div>

                {thumbnailPreviewUrl && (
                  <div className="relative inline-block max-w-[200px] border border-white/10 bg-black/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbnailPreviewUrl}
                      alt=""
                      className="aspect-square w-full max-h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, thumbnailFile: null }));
                        if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
                      }}
                      className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center border border-white/30 bg-black/80 text-lg leading-none text-white transition hover:bg-white hover:text-black"
                      aria-label="Remove thumbnail"
                    >
                      ×
                    </button>
                  </div>
                )}

                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  disabled={form.thumbnailFile !== null}
                  className="w-full bg-white/5 px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-black file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white file:uppercase disabled:cursor-not-allowed disabled:opacity-40"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setForm((prev) => ({ ...prev, thumbnailFile: file }));
                    e.target.value = '';
                  }}
                />
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-white/80">
                      Gallery images
                    </h3>
                    <p className="text-xs text-white/50">
                      Up to {MAX_GALLERY_IMAGES} images. Add more in batches; remove any with ✕. If you did not upload a thumbnail above, the first gallery image becomes the thumbnail.
                    </p>
                  </div>
                  <span className="text-xs font-medium tabular-nums text-white/70">
                    {form.images.length} / {MAX_GALLERY_IMAGES}
                  </span>
                </div>

                {imagePreviewUrls.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
                    {imagePreviewUrls.map((url, index) => (
                      <div
                        key={`${url}-${index}`}
                        className="relative aspect-square overflow-hidden border border-white/10 bg-black/20"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center border border-white/30 bg-black/80 text-lg leading-none text-white transition hover:bg-white hover:text-black"
                          aria-label={`Remove image ${index + 1}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  ref={imagesInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  disabled={form.images.length >= MAX_GALLERY_IMAGES}
                  className="w-full bg-white/5 px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-black file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white file:uppercase disabled:cursor-not-allowed disabled:opacity-40"
                  onChange={(e) => {
                    const picked = Array.from(e.target.files ?? []);
                    if (picked.length === 0) return;
                    setForm((prev) => {
                      const merged = [...prev.images, ...picked].slice(
                        0,
                        MAX_GALLERY_IMAGES
                      );
                      return { ...prev, images: merged };
                    });
                    e.target.value = '';
                  }}
                />
                {form.images.length >= MAX_GALLERY_IMAGES && (
                  <p className="text-xs text-white/50">
                    Maximum {MAX_GALLERY_IMAGES} images reached. Remove one to add another.
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase">Tags &amp; lists</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-3 md:col-span-2">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/80">
                    Tags
                  </span>
                  <p className="text-xs text-white/50">
                    Type a tag and press Enter. Click a suggested tag below to add it. Remove with ×.
                  </p>
                </div>

                <div className="flex min-h-[42px] flex-wrap gap-2 border border-white/10 bg-white/5 px-2 py-2">
                  {form.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="inline-flex items-center gap-1 border border-white/20 bg-black/30 px-2 py-0.5 text-xs text-white"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTagAt(index)}
                        className="leading-none text-white/70 hover:text-white"
                        aria-label={`Remove tag ${tag}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    className="min-w-[120px] flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-white/40"
                    placeholder="Add tag…"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        commitTagInput();
                        return;
                      }
                      if (
                        e.key === 'Backspace' &&
                        tagInput === '' &&
                        form.tags.length > 0
                      ) {
                        removeTagAt(form.tags.length - 1);
                      }
                    }}
                  />
                </div>

                {suggestedTagsAvailable.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs text-white/50">
                      Suggested tags (from catalog)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTagsAvailable.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setForm((prev) => {
                              if (
                                prev.tags.some(
                                  (t) => t.toLowerCase() === tag.toLowerCase()
                                )
                              ) {
                                return prev;
                              }
                              return { ...prev, tags: [...prev.tags, tag] };
                            });
                          }}
                          className="border border-white/20 bg-white/5 px-2 py-1 text-xs text-white/90 transition-colors hover:border-white/40 hover:bg-white/10"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 md:col-span-2">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/80">
                    Colors
                  </span>
                  <p className="text-xs text-white/50">
                    Use predefined colors from the catalog or type your own and press Enter. Remove with ×.
                  </p>
                </div>

                <div className="flex min-h-[42px] flex-wrap gap-2 border border-white/10 bg-white/5 px-2 py-2">
                  {form.colors.map((color, index) => (
                    <span
                      key={`${color}-${index}`}
                      className="inline-flex items-center gap-1 border border-white/20 bg-black/30 px-2 py-0.5 text-xs text-white"
                    >
                      {color}
                      <button
                        type="button"
                        onClick={() => removeColorAt(index)}
                        className="leading-none text-white/70 hover:text-white"
                        aria-label={`Remove color ${color}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    className="min-w-[120px] flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-white/40"
                    placeholder="Add color…"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        commitColorInput();
                        return;
                      }
                      if (
                        e.key === 'Backspace' &&
                        colorInput === '' &&
                        form.colors.length > 0
                      ) {
                        removeColorAt(form.colors.length - 1);
                      }
                    }}
                  />
                </div>

                {suggestedColorsAvailable.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs text-white/50">
                      Predefined colors (from catalog)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {suggestedColorsAvailable.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            setForm((prev) => {
                              if (
                                prev.colors.some(
                                  (c) =>
                                    c.toLowerCase() === color.toLowerCase()
                                )
                              ) {
                                return prev;
                              }
                              return { ...prev, colors: [...prev.colors, color] };
                            });
                          }}
                          className="border border-white/20 bg-white/5 px-2 py-1 text-xs text-white/90 transition-colors hover:border-white/40 hover:bg-white/10"
                        >
                          + {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label
                    htmlFor="product-highlights"
                    className="text-xs font-semibold uppercase tracking-wide text-white/80"
                  >
                    Highlights
                  </label>
                  <p className="text-xs leading-relaxed text-white/45">
                    Short selling points—one per line. These appear as bullets on the product page.
                  </p>
                </div>
                <textarea
                  id="product-highlights"
                  className={LIST_TEXTAREA_CLASS}
                  placeholder="One short line per highlight — press Enter for the next"
                  value={form.highlightsText}
                  onChange={(e) => setForm({ ...form, highlightsText: e.target.value })}
                  rows={4}
                  spellCheck
                />
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <label
                    htmlFor="product-details-lines"
                    className="text-xs font-semibold uppercase tracking-wide text-white/80"
                  >
                    Product details
                  </label>
                  <p className="text-xs leading-relaxed text-white/45">
                    Spec-style facts—one per line (e.g. dimensions, weight, material). Shown in the details section on the product page.
                  </p>
                </div>
                <textarea
                  id="product-details-lines"
                  className={LIST_TEXTAREA_CLASS}
                  placeholder="One detail per line — press Enter for the next"
                  value={form.productDetailsText}
                  onChange={(e) =>
                    setForm({ ...form, productDetailsText: e.target.value })
                  }
                  rows={4}
                  spellCheck
                />
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <label
                    htmlFor="product-care-guide"
                    className="text-xs font-semibold uppercase tracking-wide text-white/80"
                  >
                    Care guide
                  </label>
                  <p className="text-xs leading-relaxed text-white/45">
                    Cleaning, storage, and maintenance tips—one per line. Helps customers keep the product in good condition.
                  </p>
                </div>
                <textarea
                  id="product-care-guide"
                  className={LIST_TEXTAREA_CLASS}
                  placeholder="One care tip per line — press Enter for the next"
                  value={form.careGuideText}
                  onChange={(e) =>
                    setForm({ ...form, careGuideText: e.target.value })
                  }
                  rows={4}
                  spellCheck
                />
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <label
                    htmlFor="product-in-box"
                    className="text-xs font-semibold uppercase tracking-wide text-white/80"
                  >
                    In the box
                  </label>
                  <p className="text-xs leading-relaxed text-white/45">
                    What the customer receives—one item per line (e.g. parts, tools, manual). Shown as a checklist-style list.
                  </p>
                </div>
                <textarea
                  id="product-in-box"
                  className={LIST_TEXTAREA_CLASS}
                  placeholder="One item per line — press Enter for the next"
                  value={form.inBoxText}
                  onChange={(e) => setForm({ ...form, inBoxText: e.target.value })}
                  rows={4}
                  spellCheck
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase">Specifications</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className="w-full bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Handle Diameter"
                value={form.handleDiameter}
                onChange={(e) => setForm({ ...form, handleDiameter: e.target.value })}
              />
              <input
                className="w-full bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Handle Length"
                value={form.handleLength}
                onChange={(e) => setForm({ ...form, handleLength: e.target.value })}
              />
              <input
                className="w-full bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Dimensions"
                value={form.dimensions}
                onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
              />
              <input
                className="w-full bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Weight"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase">Safety / Returns</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className="w-full bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Manufacturer"
                value={form.manufacturer}
                onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
              />
              <input
                className="w-full bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                className="w-full bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              <div
                className="flex w-full flex-col gap-0.5 border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 sm:flex-row sm:items-center sm:justify-between"
                aria-label="Support email"
              >
                <span className="text-white/50">Email</span>
                <span className="break-all font-medium">{SUPPORT_EMAIL}</span>
              </div>
              <input
                className="w-full bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Website"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
              <div
                className="space-y-1 border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 md:col-span-2"
                aria-label="Returns policy"
              >
                <span className="text-xs text-white/50">Returns policy</span>
                <p className="text-sm font-medium leading-snug text-white/90">
                  {RETURNS_POLICY}
                </p>
              </div>

              <div className="grid gap-4 border border-white/10 bg-white/5 p-4 md:col-span-2 md:grid-cols-2">
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
                    Returns steps
                  </span>
                  <p className="text-xs text-white/45">
                    Fixed from catalog; shown to customers as the return flow.
                  </p>
                  <ol className="list-decimal space-y-1.5 pl-4 text-sm leading-snug text-white/90">
                    {RETURNS_STEPS.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
                    Returns notes
                  </span>
                  <p className="text-xs text-white/45">
                    Fixed from catalog; additional return conditions.
                  </p>
                  <ul className="list-disc space-y-1.5 pl-4 text-sm leading-snug text-white/90">
                    {RETURNS_NOTES.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3 border border-white/10 bg-white/3 p-4 md:col-span-2">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/80">
                    Shipping
                  </span>
                  <p className="text-xs leading-relaxed text-white/45">
                    Standard shipping details match your catalog and cannot be edited here. Add optional extra lines if this product needs more (e.g. regional notes).
                  </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-1">
                  <div className="flex flex-col gap-0.5 border border-white/10 bg-white/5 px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-white/45">Shipping type</span>
                    <span className="font-medium text-white/90">
                      {DEFAULT_SHIPPING.type}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 border border-white/10 bg-white/5 px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-white/45">Origin</span>
                    <span className="font-medium text-white/90">
                      {DEFAULT_SHIPPING.origin}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 border border-white/10 bg-white/5 px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-white/45">Warranty</span>
                    <span className="font-medium text-white/90">
                      {DEFAULT_SHIPPING.warranty}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
                    Additional shipping lines
                  </span>
                  {form.shippingExtras.length === 0 ? (
                    <p className="text-xs text-white/40">
                      No extra lines yet. Use the button below to add one.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {form.shippingExtras.map((line, index) => (
                        <li key={index} className="flex gap-2">
                          <input
                            className="min-w-0 flex-1 border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/25 focus:ring-1 focus:ring-white/15"
                            placeholder="e.g. Ships within 2 business days"
                            value={line}
                            onChange={(e) => {
                              const v = e.target.value;
                              setForm((prev) => ({
                                ...prev,
                                shippingExtras: prev.shippingExtras.map((s, i) =>
                                  i === index ? v : s
                                ),
                              }));
                            }}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                shippingExtras: prev.shippingExtras.filter(
                                  (_, i) => i !== index
                                ),
                              }))
                            }
                            className="shrink-0 border border-white/20 px-3 py-2 text-xs font-semibold uppercase text-white/80 transition-colors hover:border-white/40 hover:bg-white/10"
                            aria-label={`Remove shipping line ${index + 1}`}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        shippingExtras: [...prev.shippingExtras, ''],
                      }))
                    }
                    className="border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase text-white transition-colors hover:bg-white/15"
                  >
                    Add another line
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase">Documents & Related</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <textarea
                className="w-full bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Documents: name|url (one per line)"
                value={form.documentsText}
                onChange={(e) => setForm({ ...form, documentsText: e.target.value })}
                rows={3}
              />
              <textarea
                className="w-full bg-white/5 px-3 py-2 text-sm rounded-none outline-none focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Related products: id|name|slug (one per line)"
                value={form.relatedProductsText}
                onChange={(e) => setForm({ ...form, relatedProductsText: e.target.value })}
                rows={3}
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase">Flags</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isNewArrival}
                  onChange={(e) => setForm({ ...form, isNewArrival: e.target.checked })}
                />
                isNewArrival
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                />
                isFeatured
              </label>
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-black bg-white py-3 text-sm font-semibold uppercase text-black transition-colors hover:bg-black hover:text-white disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Create product'}
          </button>

          {message && <p className="text-sm font-semibold">{message}</p>}
        </form>
      </div>
    </div>
    </div>
  );
}