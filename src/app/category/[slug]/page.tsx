"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { Category, Product } from "@/lib/types/types";
import {
  getAllCategories,
  getProductByCategorySlug,
} from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";

export default function CategoryPage() {
  const { slug } = useParams();
  const initialSlug = Array.isArray(slug) ? slug[0] : slug || "";

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [productMap, setProductMap] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Lấy toàn bộ danh mục và load sản phẩm theo slug
  useEffect(() => {
    const fetchData = async () => {
      const allCats = await getAllCategories();
      setCategories(allCats);

      let slugs: string[] = [];

      if (initialSlug === "all") {
        slugs = allCats.map((c) => c.slug);
      } else if (initialSlug) {
        slugs = [initialSlug];
      }

      if (slugs.length > 0) {
        setSelectedSlugs(slugs);
        setLoading(true);

        const results = await Promise.all(
          slugs.map((slug) => getProductByCategorySlug(slug))
        );

        const map: Record<string, Product[]> = {};
        slugs.forEach((slug, idx) => {
          map[slug] = results[idx];
        });

        setProductMap(map);
        setLoading(false);
      }
    };

    fetchData();
  }, [initialSlug]);

  // Toggle lựa chọn danh mục (filter)
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

  // Gộp và loại trùng sản phẩm
  const combinedProducts: Product[] = Array.from(
    new Map(
      Object.values(productMap)
        .flat()
        .map((p) => [p.id, p])
    ).values()
  );

  // Lazy scroll: tăng số lượng sản phẩm hiển thị khi cuộn tới đáy
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleCount((prev) => prev + 10);
    }
  }, []);

  useEffect(() => {
    const option = { root: null, rootMargin: "0px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <div className="max-w-screen-xl mx-auto p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Sidebar */}
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

      {/* Sản phẩm */}
      <section className="md:col-span-4">
        <h1 className="text-2xl font-bold mb-4">
          Kết quả: {combinedProducts.length} sản phẩm
        </h1>

        {loading && <p className="text-gray-500 mb-2">Đang tải sản phẩm...</p>}

        {combinedProducts.length === 0 && !loading ? (
          <p className="text-gray-600">Không có sản phẩm nào được chọn.</p>
        ) : (
          <>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {combinedProducts.slice(0, visibleCount).map((p) => (
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

            {visibleCount < combinedProducts.length && (
              <div ref={observerRef} className="h-10" />
            )}
          </>
        )}
      </section>
    </div>
  );
}
