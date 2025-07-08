"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types/types";
import { getAllProducts } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);
  console.log("Tổng số sản phẩm:", products.length, products);

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Tất cả sản phẩm ({products.length})
      </h1>

      {loading && <p className="text-gray-500 mb-2">Đang tải sản phẩm...</p>}

      {products.length === 0 && !loading ? (
        <p className="text-gray-600">Không có sản phẩm nào.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
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
    </div>
  );
}
