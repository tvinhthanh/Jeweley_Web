import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import RelatedProducts from "@/components/product/RelatedProducts";
import CommentList from "@/components/comment/CommentList";
import { getProductBySlug } from "@/services/productService";
import { Product } from "@/lib/types/types";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) return notFound();

  let product: Product | null = null;

  try {
    product = await getProductBySlug(slug);
  } catch (err) {
    console.error("Lỗi khi gọi API getProductBySlug:", err);
    return notFound();
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-500">Sản phẩm không tồn tại.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <ProductDetail product={product} />
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className="text-xl font-bold mb-4">Sản phẩm tương tự</h2>
        <RelatedProducts
          slug={slug}
          categoryId={product.category?.[0]?.id ?? null}
        />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className="text-xl font-bold mb-4">Bình luận từ khách hàng</h2>
        <CommentList objectId={product.id} />
      </div>
    </div>
  );
}
