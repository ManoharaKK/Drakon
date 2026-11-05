import { Request, Response } from 'express';
import Product from '../models/Product';

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/** Legacy: single `payload` JSON string. New: flat multipart fields (objects/arrays sent as JSON strings). */
function normalizeFlatMultipartFields(raw: Record<string, unknown>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (value === undefined || value === null) continue;
    const s = String(value);
    const t = s.trim();
    if (t === '') continue;
    if ((t.startsWith('{') && t.endsWith('}')) || (t.startsWith('[') && t.endsWith(']'))) {
      try {
        out[key] = JSON.parse(t);
        continue;
      } catch {
        out[key] = s;
        continue;
      }
    }
    if (t === 'true') {
      out[key] = true;
      continue;
    }
    if (t === 'false') {
      out[key] = false;
      continue;
    }
    out[key] = s;
  }
  return out;
}

function getUploadedImageUrls(req: Request): {
  thumbnailUrl: string;
  galleryUrls: string[];
} {
  const map = req.files as Record<string, Express.Multer.File[]> | undefined;
  const thumb = map?.thumbnail?.[0];
  const imgs = map?.images ?? [];
  return {
    thumbnailUrl: thumb?.path ?? '',
    galleryUrls: imgs.map((f) => f.path),
  };
}

function getRequestBody(req: Request): Record<string, any> {
  const raw = req.body as Record<string, unknown> | undefined;
  if (!raw) return {};
  if (typeof raw.payload === 'string' && raw.payload.trim()) {
    try {
      return JSON.parse(raw.payload) as Record<string, any>;
    } catch {
      return raw as Record<string, any>;
    }
  }
  return normalizeFlatMultipartFields(raw);
}

// 🔥 CREATE PRODUCT (with Cloudinary images)
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = getRequestBody(req);
    const { name, description, price } = body;

    // ✅ validation
    if (typeof name !== 'string' || !name.trim()) {
      res.status(400).json({ success: false, message: 'name is required' });
      return;
    }

    // ✅ slug generate
    const slugBase = slugify(name) || `product-${Date.now()}`;
    const { slug: _ignoredSlug, ...rest } = body;

    const { thumbnailUrl, galleryUrls } = getUploadedImageUrls(req);

    const payload = {
      ...rest,
      name: name.trim(),
      slug: slugBase,
      description: typeof description === 'string' ? description : '',
      price: typeof price === 'number' ? price : Number(price),

      images: galleryUrls.length ? galleryUrls : [],
      thumbnail:
        thumbnailUrl ||
        galleryUrls[0] ||
        (typeof body.thumbnail === 'string' ? body.thumbnail : '') ||
        '',
    };

    const product = await new Product(payload).save();

    res.status(201).json({ success: true, data: product });

  } catch (error: any) {

    // 🔥 handle duplicate slug
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      try {
        const body = getRequestBody(req);
        const { name } = body;

        const base = slugify(name) || `product-${Date.now()}`;

        const { thumbnailUrl, galleryUrls } = getUploadedImageUrls(req);

        const product = await new Product({
          ...body,
          name: typeof name === 'string' ? name.trim() : '',
          slug: `${base}-${Date.now()}`,

          images: galleryUrls.length ? galleryUrls : [],
          thumbnail:
            thumbnailUrl ||
            galleryUrls[0] ||
            (typeof body.thumbnail === 'string' ? body.thumbnail : '') ||
            '',
        }).save();

        res.status(201).json({ success: true, data: product });
        return;

      } catch (retryError: any) {
        res.status(400).json({
          success: false,
          message: retryError?.message || error?.message,
        });
        return;
      }
    }

    res.status(400).json({ success: false, message: error.message });
  }
};

// 🔥 GET ALL PRODUCTS
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔥 GET SINGLE PRODUCT
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.status(200).json({ success: true, data: product });

  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔥 UPDATE PRODUCT (basic)
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: false,
      }
    );

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.status(200).json({ success: true, data: product });

  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🔥 DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted',
    });

  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};