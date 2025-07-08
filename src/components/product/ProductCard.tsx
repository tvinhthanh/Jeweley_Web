"use client";
import { getFavorites, addFavorite, removeFavorite } from "@/services/favoritesService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

interface ProductCardProps {
  image?: string;
  title: string;
  code?: string;
  price: number;
  slug: string;
  id: number;
}

export default function ProductCard({
  image,
  title,
  code = "",
  price,
  slug,
  id,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(false);

  const formattedPrice =
    typeof price === "number" && price > 0
      ? price.toLocaleString("vi-VN") + "₫"
      : "Liên hệ";

  useEffect(() => {
    // Kiểm tra sản phẩm có nằm trong danh sách yêu thích không
    getFavorites().then((products) => {
      setLiked(products.some((p) => p.id === id));
    });
  }, [id]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;

    setLoading(true);
    try {
      if (liked) {
        await removeFavorite(id);
        setLiked(false);
      } else {
        await addFavorite(id);
        setLiked(true);
      }
    } catch {
      alert("Lỗi khi cập nhật yêu thích.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-60 rounded-xl bg-gradient-to-b from-white to-[#e3edf7] p-4 shadow-md transition-transform hover:scale-[1.02]">
      <div className="relative w-full h-40">
        <Link href={`/product/${slug}`} aria-label={`Xem chi tiết ${title}`}>
          <Image
            src={!imgError && image ? image : "/images/ring.png"}
            alt={title}
            fill
            className="object-contain rounded"
            priority
            onError={() => setImgError(true)}
          />
        </Link>
        <button
          className="absolute top-2 right-2 text-lg text-black hover:scale-110 transition"
          onClick={handleToggleFavorite}
          aria-label={liked ? "Bỏ thích" : "Thêm vào yêu thích"}
        >
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="mt-3 text-center">
        <Link href={`/product/${slug}`} className="block">
          <p className="text-sm font-medium text-gray-800 line-clamp-2">
            {title}
            {code && (
              <span className="text-gray-500 font-normal"> - {code}</span>
            )}
          </p>
          <p className="mt-2 text-xl font-bold text-blue-600">
            {formattedPrice}
          </p>
        </Link>
      </div>
    </div>
  );
}
