"use client";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

// Dữ liệu sản phẩm mẫu
const products = [
  { name: "SP 1", category: "trang-suc", type: "rings" },
  { name: "SP 2", category: "trang-suc", type: "earrings" },
  { name: "SP 3", category: "trang-suc", type: "necklace" },
  { name: "SP 4", category: "trang-suc-cuoi", type: "rings" },
  { name: "SP 5", category: "trang-suc", type: "rings" },
  { name: "SP 6", category: "nam", type: "bracelets" },
];

// Nhãn loại sản phẩm
const TYPE_LABELS: Record<string, string> = {
  charms: "Charms",
  bracelets: "Bracelets",
  rings: "Rings",
  necklace: "Necklace",
  earrings: "Earrings",
};

// Nhãn slug category
const SLUG_LABELS: Record<string, string> = {
  "trang-suc": "TRANG SỨC",
  "trang-suc-cuoi": "TRANG SỨC CƯỚI",
  "kim-cuong": "TRANG SỨC KIM CƯƠNG",
  "nam": "TRANG SỨC NAM",
  "nu": "TRANG SỨC NỮ",
  "thuong-hieu": "TRANG SỨC THƯƠNG HIỆU",
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const productsInCategory = useMemo(
    () => products.filter((p) => p.category === slug),
    [slug]
  );

  const availableTypes = useMemo(() => {
    const set = new Set(productsInCategory.map((p) => p.type));
    return [...set];
  }, [productsInCategory]);

  // Mặc định: tất cả loại trong category được chọn
  const [selectedTypes, setSelectedTypes] = useState<string[]>(availableTypes);

  // Toggle
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const filteredProducts = productsInCategory.filter((p) =>
    selectedTypes.includes(p.type)
  );

  const typeCountMap = useMemo(() => {
    const map: Record<string, number> = {};
    productsInCategory.forEach((p) => {
      map[p.type] = (map[p.type] || 0) + 1;
    });
    return map;
  }, [productsInCategory]);

  return (
    <div className="max-w-screen-xl mx-auto p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Sidebar */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-2">Loại sản phẩm</h2>
        {Object.entries(TYPE_LABELS).map(([type, label]) => {
          const count = typeCountMap[type];
          if (!count) return null;

          return (
            <label key={type} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
                className="accent-blue-600"
              />
              <span>
                {label} ({count})
              </span>
            </label>
          );
        })}
      </div>

      {/* Main content */}
      <div className="md:col-span-4">
        <h1 className="text-2xl font-bold mb-4">
          Kết quả: {SLUG_LABELS[slug] || slug}
        </h1>
        {filteredProducts.length === 0 ? (
          <p className="text-gray-600">Không có sản phẩm nào phù hợp.</p>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map((p, idx) => (
              <li key={idx} className="border p-4 rounded">
                {p.name} - {TYPE_LABELS[p.type] || p.type}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
