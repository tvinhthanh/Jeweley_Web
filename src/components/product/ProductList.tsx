"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import ProductCard from "./ProductCard";

interface Product {
  name: string;
  image: string;
  price: number;
  slug?: string;
}

type DisplayMode = "scroll" | "loadMore" | "full";

interface Props {
  products: Product[];
  displayMode?: DisplayMode;
}

export default function ProductList({ products, displayMode = "full" }: Props) {
  const [visibleCount, setVisibleCount] = useState(4);
  const visibleProducts =
    displayMode === "full"
      ? products
      : displayMode === "loadMore"
      ? products.slice(0, visibleCount)
      : products;

  // Nếu là scroll mode
  if (displayMode === "scroll") {
    if (products.length <= 4) {
      return (
        <div className="flex flex-wrap justify-center gap-6 max-w-screen-xl mx-auto">
          {products.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      );
    }

    return (
      <div className="relative bg-white py-8 px-4">
        <div className="max-w-screen-xl mx-auto relative">
          <Swiper
            spaceBetween={-64}
            slidesPerView={2}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation]}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="relative"
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center">
                  <ProductCard product={item} />
                </div>
              </SwiperSlide>
            ))}

            {/* Mũi tên bên trái */}
            <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 text-2xl text-blue-500 px-1" />
            {/* Mũi tên bên phải */}
            <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 text-2xl text-blue-500 px-1" />
          </Swiper>
        </div>
      </div>
    );
  }

  // loadMore hoặc full
  return (
    <div className="bg-white py-8 px-4">
      <div className="flex flex-wrap justify-center gap-6 max-w-screen-xl mx-auto">
        {visibleProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {displayMode === "loadMore" && visibleCount < products.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={product.slug ? `/product/${product.slug}` : "#"}
      className="w-[250px] h-auto border rounded p-4 bg-white hover:shadow-md transition duration-300 flex flex-col items-center"
    >
      <Image
        src={product.image}
        width={180}
        height={180}
        alt={product.name}
        className="object-contain mb-2"
      />
      <p className="text-center text-sm font-medium line-clamp-2">
        {product.name}
      </p>
      <p className="text-blue-600 font-semibold mt-1">
        {product.price.toLocaleString("vi-VN")}đ
      </p>
    </Link>
  );
}
