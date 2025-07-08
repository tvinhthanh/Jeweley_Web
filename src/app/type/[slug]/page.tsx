import { getCategoryIdBySlug } from "@/services/productService";
import Image from "next/image";
import { Product } from "@/lib/types/types"; // hoặc đúng đường dẫn file interface của bạn

export default async function TypePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const result = await getCategoryIdBySlug(slug);
  const products: Product[] = Array.isArray(result) ? result : [];
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        Kết quả tìm kiếm cho &quot;{slug.replace(/-/g, " ")}&quot;
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar filter */}
        <aside className="w-full md:w-1/4 border rounded p-4 bg-white">
          <h2 className="text-lg font-semibold mb-3">Danh mục</h2>
          <ul className="space-y-2 text-sm">
            {["Charms", "Bracelets", "Rings", "Necklace", "Earrings"].map((cat) => (
              <li key={cat} className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" />
                <label>{cat}</label>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product grid */}
        <section className="w-full md:w-3/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length === 0 ? (
            <p className="col-span-full text-gray-500 text-center">Không tìm thấy sản phẩm nào.</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-b from-white to-[#e3edf7] rounded-xl p-3 shadow transition-transform hover:scale-[1.02]"
              >
                <div className="relative w-full h-40 rounded overflow-hidden">
                  <Image
                    src={product.images[0] || "/images/ring.png"}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-sm font-medium mt-2 line-clamp-2">{product.name}</h3>
                <p className="text-blue-600 font-bold mt-1">
                  {product.price > 0
                    ? `${product.price.toLocaleString("vi-VN")}₫`
                    : "Liên hệ"}
                </p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
