"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { getProductsByCategoryId } from "@/services/productService";
import { Product } from "@/lib/types/types";
import Link from "next/link";
import Image from "next/image";

type Props = {
  slug: string;
  categoryId: number | null;
};

export default function RelatedProducts({ slug, categoryId }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!categoryId) return;

    getProductsByCategoryId(categoryId).then((res) => {
      const filtered = res.filter((p) => p.slug !== slug);
      setProducts(filtered);
    });
  }, [categoryId, slug]);

  if (products.length <= 4) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button className="swiper-button-prev p-2" />
      </div>
      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button className="swiper-button-next p-2" />
      </div>

      <Swiper
        spaceBetween={16}
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
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="border rounded p-3 hover:shadow-lg transition duration-300 bg-white block"
    >
      <Image
        src={product.images?.[0] || "/placeholder.png"}
        width={160}
        height={160}
        alt={product.name}
        className="mx-auto object-contain"
      />
      <div className="mt-2 text-sm text-center">
        <p className="font-medium truncate">{product.name}</p>
        <p className="text-blue-600 font-semibold">
          {product.price.toLocaleString("vi-VN")}₫
        </p>
      </div>
    </Link>
  );
}
