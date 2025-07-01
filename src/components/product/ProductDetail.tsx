"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaCreditCard,
  FaGift,
  FaHeart,
  FaRegHeart,
  FaStar,
} from "react-icons/fa";

type Product = {
  name: string;
  slug: string;
  material: string;
  price: number;
  oldPrice?: number;
  rating: number;
  ratingCount: number;
  sizes: string[];
  images: string[];
  description: string;
  colors?: string[];
};

export default function ProductDetail({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Vui lòng chọn màu và size trước khi thêm vào giỏ hàng.");
      return;
    }

    const cartItem = {
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    };

    console.log("Thêm vào giỏ:", cartItem);
    // TODO: Gửi lên context, redux hoặc localStorage tại đây
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl mx-auto p-6">
      {/* Left: Gallery và hình lớn */}
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-2">
          <button className="text-gray-500 rotate-180">▲</button>
          {product.images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              width={200}
              height={200}
              className="rounded object-cover border cursor-pointer"
            />
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
          {product.price.toLocaleString("vi-VN")} ₫
          {product.oldPrice && (
            <span className="text-gray-400 line-through ml-3">
              {product.oldPrice.toLocaleString("vi-VN")} ₫
            </span>
          )}
        </div>

        <div className="text-sm text-gray-700">Chất liệu: {product.material}</div>

        {/* Chọn màu */}
        {product.colors?.length > 0 && (
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
                      color === "silver"
                        ? "linear-gradient(to right, #ccc, #999)"
                        : color === "gold"
                        ? "radial-gradient(circle at center, #ffd700, #daa520)"
                        : color,
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Đánh giá */}
        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: product.rating }).map((_, i) => (
            <span key={i}>
              <FaStar />
            </span>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({product.ratingCount} đánh giá)
          </span>
        </div>

        {/* Chọn size */}
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

        {/* Yêu thích & Trả góp */}
        <div className="flex flex-col gap-2 text-sm text-gray-700 mt-2">
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-black"
            onClick={() => setIsWishlisted(!isWishlisted)}
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
            <span className="text-lg">
              <FaCreditCard />
            </span>
            <span>Trả góp qua thẻ tín dụng</span>
          </div>
        </div>

        {/* Hộp quà */}
        <div className="border px-4 py-3 mt-4 rounded relative">
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-1">
              <FaGift />
            </span>
            <div>
              <p className="font-semibold text-base">TẶNG QUÀ</p>
              <p className="text-sm text-gray-600 leading-snug mt-1">
                Lorem ipsum dolor sit amet consectetur. Sed commodo pellentesque arcu
                tristique et morbi.
              </p>
            </div>
          </div>
          <button className="mt-4 bg-indigo-100 text-indigo-600 font-semibold px-4 py-2 rounded w-full text-sm hover:bg-indigo-200 transition">
            TẶNG QUÀ CHO NGƯỜI KHÁC
          </button>
        </div>
      </div>

      {/* Mô tả chi tiết */}
      <div className="col-span-1 md:col-span-2 mt-8">
        <p className="text-sm text-justify leading-6 text-gray-800">
          {product.description}
        </p>
      </div>
    </div>
  );
}
