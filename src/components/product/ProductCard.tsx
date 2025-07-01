"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

interface ProductCardProps {
  image: string;
  title: string;
  code: string;
  price: number;
  slug: string;
}

export default function ProductCard({
  image,
  title,
  code,
  price,
  slug,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Link href={`/product/${slug}`}>
    <div className="w-60 rounded-xl bg-gradient-to-b from-white to-[#e3edf7] p-4 shadow-md">
      <div className="relative w-full h-40">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
          priority
        />
        <button
          className="absolute top-1 right-1 text-lg text-black"
          onClick={() => setLiked(!liked)}
          aria-label={liked ? "Bỏ thích" : "Thêm vào yêu thích"}
        >
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>
      <div className="mt-3 text-center">
        <p className="text-sm font-medium text-gray-800 line-clamp-2">
          {title}{" "}
          <span className="text-gray-500 font-normal">- {code}</span>
        </p>
        <p className="mt-2 text-xl font-bold text-blue-600">
          {typeof price === "number" ? price.toLocaleString("vi-VN") + "đ" : "Liên hệ"}
        </p>
      </div>
    </div>
    </Link>
  );
}
