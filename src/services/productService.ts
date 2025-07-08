/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category, Product, Variation } from '@/lib/types/types';
import api from './api';

const transformRawProduct = (raw: any): Product => ({
  id: raw.id,
  slug: raw.slug,
  name: raw.name,
  description: raw.description || '',
  price: parseFloat(raw.price),
  oldPrice: parseFloat(raw.regular_price || raw.price),
  rating: raw.average_rating ? parseFloat(raw.average_rating) : 0,
  ratingCount: raw.rating_count ?? 0,
  sizes: raw.attributes.find((a: any) => a.name === 'Size')?.options ?? [],
  colors: raw.attributes.find((a: any) => a.name === 'Color')?.options ?? [],
  images: raw.images?.map((img: any) => img.src) ?? [],
  category: raw.categories?.map((c: any) => ({ id: c.id, name: c.name })) ?? [],
  type: raw.tags?.map((tag: any) => tag.name) ?? [],
  code: raw.sku || '', // Thêm sku nếu có
});
export const transformRawProducts = (raw: any): Product => ({
  id: raw.id,
  slug: raw.slug,
  name: raw.name,
  description: raw.description?.replace(/<[^>]+>/g, '') || '',

  // Nếu là sản phẩm variable và không có price thì fallback tạm 0
  price: parseFloat(raw.price) || 0,

  // Nếu không có regular_price thì lấy luôn price làm oldPrice
  oldPrice: parseFloat(raw.regular_price || raw.price || "0"),

  rating: raw.average_rating ? parseFloat(raw.average_rating) : 0,
  ratingCount: raw.rating_count ?? 0,

  // Lấy các thuộc tính 'Size' và 'Color'
  sizes:
    raw.attributes?.find((a: any) => a.name.toLowerCase() === 'size')?.options ??
    [],
  colors:
    raw.attributes?.find((a: any) => a.name.toLowerCase() === 'color')?.options ??
    [],

  // Lấy danh sách ảnh hoặc fallback 1 ảnh placeholder
  images:
    raw.images?.length > 0
      ? raw.images.map((img: any) => img.src)
      : ['/images/ring.png'],

  // Lấy category (id + name)
  category:
    raw.categories?.map((c: any) => ({ id: c.id, name: c.name })) ?? [],

  // Lấy tag name nếu có
  type: raw.tags?.map((tag: any) => tag.name) ?? [],
  code: raw.sku || '', // Thêm sku nếu có
});

// ✅ Lấy tất cả sản phẩm
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get('/wc/v3/products');
  return response.data.map(transformRawProduct);
};

// ✅ Lấy theo ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/wc/v3/products/${id}`);
  return transformRawProduct(response.data);
};

// ✅ Lấy theo Slug
export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const res = await api.get('/wc/v3/products', { params: { slug } });
  const raw = res.data?.[0];
  return raw ? transformRawProduct(raw) : null;
};

// ✅ Lấy Category ID theo slug
export const getCategoryIdBySlug = async (slug: string): Promise<number | null> => {
  const response = await api.get(`/wp/v2/product_cat`, {
    params: { slug }
  });
  const category = response.data?.[0];
  return category ? category.id : null;
};
export const getProductsByCategoryIds = async (categoryIds: number[]): Promise<Product[]> => {
  const response = await api.get(`/wc/v3/products`, {
    params: {
      category: categoryIds.join(','), // support nhiều category
      per_page: 50,
      status: 'publish',
    },
  });
  return response.data.map(transformRawProduct);
};
// ✅ Lấy sản phẩm theo category ID
export const getProductsByCategoryId = async (categoryId: number): Promise<Product[]> => {
  const response = await api.get(`/wc/v3/products`, {
    params: { category: categoryId, per_page: 20, status: 'publish' }
  });
  return response.data.map(transformRawProduct);
};

// ✅ Lấy sản phẩm theo category slug (gộp 2 hàm trên)
export const getProductByCategorySlug = async (slug: string): Promise<Product[]> => {
  try {
    const categoryId = await getCategoryIdBySlug(slug);
    if (!categoryId) throw new Error("Category not found");
    return await getProductsByCategoryId(categoryId);
  } catch (err) {
    console.error("getProductByCategorySlug error:", err);
    return [];
  }
};
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get(`/custom/v1/categories`);
    return response.data as Category[];
  } catch (error) {
    console.error('getAllCategories error:', error);
    return [];
  }
};
export const getProductVariations = async (
  productId: number
): Promise<Variation[]> => {
  try {
    const res = await api.get(`/custom/v1/product-variations/${productId}`);
    return res.data as Variation[];
  } catch (error) {
    console.error("Lỗi khi lấy biến thể sản phẩm:", error);
    return [];
  }
};