"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaCreditCard,
  FaGift,
  FaHeart,
  FaRegHeart,
  FaStar,
} from "react-icons/fa";
import { Products, Variation } from "@/lib/types/types";
import { getProductVariations } from "@/services/productService";
import { addFavorite, removeFavorite } from "@/services/favoritesService";
import { addToCart } from "@/services/cartService";

export default function ProductDetail({ product }: { product: Products }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [oldPrice, setOldPrice] = useState<number | null>(null);

  // Fetch variations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductVariations(product.id);
        setVariations(data);
      } catch (error) {
        console.error("Không thể lấy biến thể sản phẩm:", error);
      }
    };
    fetchData();
  }, [product.id]);

  // Cập nhật giá khi chọn variation
  useEffect(() => {
    if (!selectedColor || !selectedSize) {
      setSelectedPrice(null);
      setOldPrice(null);
      return;
    }

    const matched = variations.find((v) => {
      const attr = v.attributes;
      return (
        attr["color"]?.toLowerCase() === selectedColor.toLowerCase() &&
        attr["size"]?.toLowerCase() === selectedSize.toLowerCase()
      );
    });

    if (matched) {
      setSelectedPrice(matched.sale_price || matched.price);
      setOldPrice(matched.sale_price ? matched.regular_price : null);
    } else {
      setSelectedPrice(null);
      setOldPrice(null);
    }
  }, [selectedColor, selectedSize, variations]);

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      alert("Vui lòng chọn màu và size.");
      return;
    }

    const matched = variations.find((v) => {
      const attr = v.attributes;
      return (
        attr["color"]?.toLowerCase() === selectedColor.toLowerCase() &&
        attr["size"]?.toLowerCase() === selectedSize.toLowerCase()
      );
    });

    if (!matched) {
      alert("Không tìm thấy biến thể phù hợp.");
      return;
    }

    const payload = {
      product_id: product.id,
      quantity: 1,
      variation: {
        color: selectedColor,
        size: selectedSize,
      },
      snapshot: {
        slug: product.slug || "",
        name: product.name,
        image: matched.image || product.images[0], // lấy từ variation nếu có
        price: matched.sale_price || matched.price,
      },
    };

    try {
      await addToCart(payload);
      alert("Đã thêm sản phẩm vào giỏ hàng.");
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Lỗi khi thêm vào giỏ hàng.");
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isWishlisted) {
        await removeFavorite(product.id);
        setIsWishlisted(false);
      } else {
        await addFavorite(product.id);
        setIsWishlisted(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl mx-auto p-6">
      {/* Left: Gallery */}
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-2">
          <button className="text-gray-500 rotate-180">▲</button>
          {product.images.map((img, idx) => (
            <div key={idx} className="w-24 h-24 relative">
              <Image
                src={img}
                alt={`thumb-${idx}`}
                fill
                className="object-cover rounded border cursor-pointer"
              />
            </div>
          ))}
          <button className="text-gray-500">▼</button>
        </div>

        <div className="flex-1">
          <div className="relative w-full h-[600px] aspect-square rounded overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <Image
              src="/images/shadow-ellipse.svg"
              alt="shadow"
              width={550}
              height={100}
            />
          </div>
        </div>
      </div>

      {/* Right: Info */}
      <div className="space-y-4 w-full max-w-sm ml-auto">
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <div className="text-red-600 text-xl font-semibold">
          {(selectedPrice ?? product.price).toLocaleString("vi-VN")} ₫
          {oldPrice && (
            <span className="text-gray-400 line-through ml-3">
              {oldPrice.toLocaleString("vi-VN")} ₫
            </span>
          )}
        </div>

        {/* Color Selector */}
        {Array.isArray(product.colors) && product.colors.length > 0 && (
          <div>
            <p className="font-medium">Chọn màu:</p>
            <div className="flex items-center gap-3 mt-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className={`w-7 h-7 rounded-full border-2 cursor-pointer ${
                    selectedColor === color ? "border-black scale-110" : "border-gray-300"
                  }`}
                  style={{
                    background:
                      color.toLowerCase() === "silver"
                        ? "linear-gradient(to right, #ccc, #999)"
                        : color.toLowerCase() === "gold"
                        ? "radial-gradient(circle at center, #ffd700, #daa520)"
                        : color,
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: product.rating }).map((_, i) => (
            <FaStar key={i} />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({product.ratingCount} đánh giá)
          </span>
        </div>

        {/* Size Selector */}
        <div>
          <p className="font-medium">Chọn size:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border px-3 py-1 text-sm rounded ${
                  selectedSize === size
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700 mt-4"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ
        </button>

        {/* Favorite + Credit */}
        <div className="flex flex-col gap-2 text-sm text-gray-700 mt-2">
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-black"
            onClick={handleToggleFavorite}
          >
            <span className="text-lg">
              {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </span>
            <span className="underline">
              {isWishlisted
                ? "Đã lưu vào danh sách yêu thích"
                : "Lưu vào danh sách yêu thích"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaCreditCard />
            <span>Trả góp qua thẻ tín dụng</span>
          </div>
        </div>

        {/* Gift box */}
        <div className="border px-4 py-3 mt-4 rounded relative">
          <div className="flex items-start gap-3">
            <FaGift className="text-2xl mt-1" />
            <div>
              <p className="font-semibold text-base">TẶNG QUÀ</p>
              <p className="text-sm text-gray-600 leading-snug mt-1">
                Bạn có thể gửi quà cho người thân, người yêu với gói quà tặng sang trọng.
              </p>
            </div>
          </div>
          <button className="mt-4 bg-indigo-100 text-indigo-600 font-semibold px-4 py-2 rounded w-full text-sm hover:bg-indigo-200 transition">
            TẶNG QUÀ CHO NGƯỜI KHÁC
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="col-span-1 md:col-span-2 mt-8">
        <p className="text-sm text-justify leading-6 text-gray-800">
          {product.description}
        </p>
      </div>
    </div>
  );
}
