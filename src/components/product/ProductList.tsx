"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types/types";

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   slug: string;
//   code?: string;
// }

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
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              title={product.name}
              image={product.images[0] || "/images/ring.png"} // fallback image
              price={product.price}
              code={product.code}
            />
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
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="flex justify-center">
                  <ProductCard
                    id={product.id}
                    slug={product.slug}
                    title={product.name}
                    image={product.images[0] || "/images/ring.png"} // fallback image
                    price={product.price}
                    code={product.code}
                  />
                </div>
              </SwiperSlide>
            ))}

            {/* Mũi tên trái/phải */}
            <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 text-2xl text-blue-500 px-1" />
            <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 text-2xl text-blue-500 px-1" />
          </Swiper>
        </div>
      </div>
    );
  }

  // full / loadMore
  return (
    <div className="bg-white py-8 px-4">
      <div className="flex flex-wrap justify-center gap-6 max-w-screen-xl mx-auto">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            slug={product.slug}
            title={product.name}
            image={product.images[0] || "/images/ring.png"} // fallback image
            price={product.price}
            code={product.code}
          />
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
