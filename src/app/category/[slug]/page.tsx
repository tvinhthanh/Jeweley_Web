"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Category, Product } from "@/lib/types/types";
import { getAllCategories, getProductByCategorySlug } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";

export default function CategoryPage() {
  const { slug } = useParams();
  const initialSlug = typeof slug === "string" ? slug : "";

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [productMap, setProductMap] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(false);

  // Lấy toàn bộ danh mục
  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  // Nếu có slug trong URL thì tự động chọn danh mục và fetch
  useEffect(() => {
    if (initialSlug && !selectedSlugs.includes(initialSlug)) {
      setSelectedSlugs((prev) => [...prev, initialSlug]);
      setLoading(true);
      getProductByCategorySlug(initialSlug)
        .then((products) => {
          setProductMap((prev) => ({ ...prev, [initialSlug]: products }));
        })
        .finally(() => setLoading(false));
    }
  }, [initialSlug]);

  // Toggle lựa chọn danh mục
  const toggleCategory = (slug: string) => {
    const isSelected = selectedSlugs.includes(slug);

    if (isSelected) {
      setSelectedSlugs((prev) => prev.filter((s) => s !== slug));
      setProductMap((prev) => {
        const newMap = { ...prev };
        delete newMap[slug];
        return newMap;
      });
    } else {
      setSelectedSlugs((prev) => [...prev, slug]);
      setLoading(true);
      getProductByCategorySlug(slug)
        .then((products) => {
          setProductMap((prev) => ({ ...prev, [slug]: products }));
        })
        .finally(() => setLoading(false));
    }
  };

  // Gộp và loại trùng sản phẩm theo ID
  const combinedProducts: Product[] = Array.from(
    new Map(
      Object.values(productMap)
        .flat()
        .map((p) => [p.id, p])
    ).values()
  );

  return (
    <div className="max-w-screen-xl mx-auto p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Sidebar lọc danh mục */}
      <aside className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Danh mục</h2>
          <ul className="space-y-1 text-sm">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedSlugs.includes(cat.slug)}
                  onChange={() => toggleCategory(cat.slug)}
                  className="accent-blue-600"
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </ul>
        </div>
      </aside>

      {/* Nội dung sản phẩm */}
      <section className="md:col-span-4">
        <h1 className="text-2xl font-bold mb-4">
          Kết quả: {combinedProducts.length} sản phẩm
        </h1>

        {loading && <p className="text-gray-500 mb-2">Đang tải sản phẩm...</p>}

        {combinedProducts.length === 0 && !loading ? (
          <p className="text-gray-600">Không có sản phẩm nào được chọn.</p>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {combinedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                slug={p.slug}
                image={p.images?.[0]}
                title={p.name}
                code={p.category?.[0]?.name ?? ""}
                price={p.price}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
