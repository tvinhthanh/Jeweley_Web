import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import RelatedProducts from "@/components/product/RelatedProducts";
import CommentList from "@/components/comment/CommentList";
import { getProductBySlug } from "@/services/productService";
import { Product } from "@/lib/types/types";

// 👇 export cái này để tránh lỗi dynamic routing (Next.js yêu cầu khi không dùng generateStaticParams)
export const dynamicParams = true;

type ProductPageProps = {
  params: { slug: string }; // không cần dấu ? nếu bạn luôn gọi từ dynamic route
};

export default async function ProductPage({ params }: ProductPageProps) {
  const slug = params?.slug;

  // Nếu không có slug → trả về trang 404
  if (!slug) return notFound();

  // Lấy thông tin sản phẩm theo slug
  const product: Product | null = await getProductBySlug(slug);

  // Nếu không tìm thấy sản phẩm → thông báo
  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-500">Sản phẩm không tồn tại.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Thông tin sản phẩm */}
      <ProductDetail product={product} />

      {/* Sản phẩm tương tự */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className="text-xl font-bold mb-4">Sản phẩm tương tự</h2>
        <RelatedProducts
          slug={slug}
          categoryId={product.category?.[0]?.id ?? null}
        />
      </div>

      {/* Bình luận khách hàng */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className="text-xl font-bold mb-4">Bình luận từ khách hàng</h2>
        <CommentList objectId={Number(product.id)} />
      </div>
    </div>
  );
}
