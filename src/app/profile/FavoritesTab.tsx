"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { getFavorites, removeFavorite } from "@/services/favoritesService";
import { Product } from "@/lib/types/types";
import formatPrice from "@/lib/ultis/FormatPrice";

export default function FavoritesTab() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu thích:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (productId: number) => {
    try {
      const result = await removeFavorite(productId);
      if (result.success) {
        setFavorites((prev) => prev.filter((item) => item.id !== productId));
      }
    } catch (error) {
      console.error("Lỗi khi xoá sản phẩm khỏi yêu thích:", error);
      alert("Không thể xoá khỏi danh sách yêu thích.");
    }
  };

  const handleViewDetail = (slug?: string) => {
    if (slug) {
      router.push(`/product/${slug}`);
    } else {
      alert("Không tìm thấy thông tin sản phẩm.");
    }
  };

  if (loading) {
    return <p className="text-gray-300">Đang tải danh sách yêu thích...</p>;
  }

  if (favorites.length === 0) {
    return <p className="text-gray-400">Bạn chưa có sản phẩm yêu thích nào.</p>;
  }

  return (
    <div className="text-white">
      <div className="grid grid-cols-12 py-4 border-b border-gray-600 font-semibold text-sm text-gray-400">
        <div className="col-span-6">Sản phẩm</div>
        <div className="col-span-3">Giá</div>
        <div className="col-span-3">Thao tác</div>
      </div>

      {favorites.map((item) => {
        const imageSrc =
          item.images?.length > 0 ? item.images[0] : item.image || "/images/ring.png";

        return (
          <div
            key={item.id}
            className="grid grid-cols-12 items-center py-4 border-b border-gray-700 text-sm"
          >
            {/* Product Info */}
            <div className="col-span-6 flex items-center gap-4">
              <button
                className="text-gray-400 hover:text-red-500"
                onClick={() => handleRemoveFavorite(item.id)}
              >
                <FaTimes />
              </button>

              <div className="relative w-16 h-16">
                <Image
                  src={imageSrc}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                />
              </div>

              <div>
                <p className="text-black">{item.name}</p>
                {item.category?.[0]?.name && (
                  <p className="text-black-400 text-xs">
                    {item.category[0].name}
                  </p>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="col-span-3 text-black font-semibold">
              {formatPrice(item.price)}
            </div>

            {/* Action */}
            <div className="col-span-3">
              <button
                onClick={() => handleViewDetail(item.slug)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
