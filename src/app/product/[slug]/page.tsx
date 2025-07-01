import ProductDetail from "@/components/product/ProductDetail";
import CommentList from "@/components/comment/CommentList";
import RelatedProducts from "@/components/product/RelatedProducts";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params);
  const product = {
    slug,
    name: "Nhẫn Kim cương NKC1201",
    material: "Sterling Silver",
    price: 4720000,
    oldPrice: 5900000,
    rating: 4,
    ratingCount: 56,
    sizes: ["5.9 in", "6.3 in", "7.1 in", "7.4 in", "8.3 in", "8.5 in"],
    images: [
      "/images/product.png",
      "/images/hand1.jpg",
      "/images/hand2.jpg",
    ],
    colors: ["gold", "silver", "#000000"],
    description: `Lấp lánh sang trọng nhưng lại chẳng hề phô trương...`,
  };

  return (
    <div className="space-y-12">
      <ProductDetail product={product} />

      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className="text-xl font-bold mb-4">Sản phẩm tương tự</h2>
        <RelatedProducts slug={slug} />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h2 className="text-xl font-bold mb-4">Bình luận từ khách hàng</h2>
        <CommentList objectId={slug} objectType="product" />
      </div>
    </div>
  );
}
