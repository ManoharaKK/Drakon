import mongoose, { Schema, Document } from "mongoose";

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

interface IRelatedProduct {
  id: number;
  name: string;
  slug: string;
}

interface IDocument {
  name: string;
  url: string;
}

interface ILegalSafety {
  manufacturer: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

interface IReturns {
  policy: string;
  steps: string[];
  notes: string[];
}

interface IShipping {
  type: string;
  origin: string;
  warranty: string;
  /** Optional extra lines shown after the standard shipping block. */
  extras?: string[];
}

interface ISpecifications {
  handleDiameter: string;
  handleLength: string;
  dimensions: string;
  weight: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: string;
  brand: string;

  price: number;
  discount?: number;
  discountedPrice?: number;

  stock: number;
  rating: number;
  reviewCount: number;

  sku: string;

  tags: string[];
  images: string[];
  thumbnail: string;

  description: string;
  highlights: string[];
  productDetails: string[];

  specifications: ISpecifications;
  careGuide: string[];
  inBox: string[];

  legalSafety: ILegalSafety;
  returns: IReturns;
  shipping: IShipping;

  documents: IDocument[];
  relatedProducts: IRelatedProduct[];

  colors: string[];

  isNewArrival: boolean;
  isFeatured: boolean;
  inStock: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, trim: true },
    slug: { type: String, unique: true, sparse: true, trim: true },

    category: { type: String },
    brand: { type: String },

    price: { type: Number },
    discount: { type: Number, default: 0 },
    discountedPrice: { type: Number },

    stock: { type: Number },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },

    sku: { type: String },

    tags: [{ type: String }],
    images: [{ type: String }],
    thumbnail: { type: String },

    description: { type: String },
    highlights: [{ type: String }],
    productDetails: [{ type: String }],

    specifications: {
      handleDiameter: String,
      handleLength: String,
      dimensions: String,
      weight: String,
    },

    careGuide: [{ type: String }],
    inBox: [{ type: String }],

    legalSafety: {
      manufacturer: String,
      address: String,
      phone: String,
      email: String,
      website: String,
    },

    returns: {
      policy: String,
      steps: [{ type: String }],
      notes: [{ type: String }],
    },

    shipping: {
      type: { type: String },
      origin: String,
      warranty: String,
      extras: [{ type: String }],
    },

    documents: [
      {
        name: String,
        url: String,
      },
    ],

    relatedProducts: [
      {
        id: Number,
        name: String,
        slug: String,
      },
    ],

    colors: [{ type: String }],

    isNewArrival: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);


;(productSchema as any).pre("save", async function (this: any) {
  // Only generate when missing/empty. (Controller should normally set it, but this is the safety net.)
  if ((!this.slug || typeof this.slug !== "string" || !this.slug.trim()) && typeof this.name === "string" && this.name.trim()) {
    const baseSlug = slugify(this.name) || `product-${Date.now()}`;

    let candidate = baseSlug;
    let count = 1;

    const Model = (this.constructor as any) ?? mongoose.models.Product;
    while (Model && (await Model.exists({ slug: candidate }))) {
      candidate = `${baseSlug}-${count}`;
      count++;
    }
    this.slug = candidate;
  }
});
productSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, ret: any) {
    if (ret && typeof ret.isNewArrival === 'boolean') {
      ret.isNew = ret.isNewArrival
      delete ret.isNewArrival
    }
    return ret
  },
})
export default mongoose.model<IProduct>("Product", productSchema);