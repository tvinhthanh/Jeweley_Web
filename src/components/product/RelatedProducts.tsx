"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
}

const relatedItems: Product[] = [
  {
    id: 1,
    name: "Nhẫn Kim cương Vàng Trắng 14K My First Diamond – MFD58982",
    price: 19945000,
    image: "/images/ring.png",
    slug: "nhan-vang-trang-14k-1",
  },
  {
    id: 2,
    name: "Nhẫn Kim cương Vàng 18K – MFD58983",
    price: 18500000,
    image: "/images/ring.png",
    slug: "nhan-vang-18k",
  },
  {
    id: 3,
    name: "Nhẫn Kim cương Trắng – MFD58984",
    price: 20450000,
    image: "/images/ring.png",
    slug: "nhan-kim-cuong-trang",
  },
  {
    id: 4,
    name: "Nhẫn Nữ Đính Đá Sang Trọng – MFD58985",
    price: 19450000,
    image: "/images/ring.png",
    slug: "nhan-nu-sang-trong",
  },
  {
    id: 1,
    name: "Nhẫn Kim cương Vàng Trắng 14K My First Diamond – MFD58982",
    price: 19945000,
    image: "/images/ring.png",
    slug: "nhan-vang-trang-14k-1",
  },
  {
    id: 2,
    name: "Nhẫn Kim cương Vàng 18K – MFD58983",
    price: 18500000,
    image: "/images/ring.png",
    slug: "nhan-vang-18k",
  },
  {
    id: 3,
    name: "Nhẫn Kim cương Trắng – MFD58984",
    price: 20450000,
    image: "/images/ring.png",
    slug: "nhan-kim-cuong-trang",
  },
  {
    id: 4,
    name: "Nhẫn Nữ Đính Đá Sang Trọng – MFD58985",
    price: 19450000,
    image: "/images/ring.png",
    slug: "nhan-nu-sang-trong",
  },
];

export default function RelatedProducts({ slug }: { slug: string }) {
  const filtered = relatedItems.filter((item) => item.slug !== slug);

  if (filtered.length <= 4) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Swiper navigation buttons */}
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button className="swiper-button-prev p-2">
        </button>
      </div>
      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button className="swiper-button-next p-2">
        </button>
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
        {filtered.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard product={item} />
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
        src={product.image}
        width={160}
        height={160}
        alt={product.name}
        className="mx-auto object-contain"
      />
      <div className="mt-2 text-sm text-center">
        <p className="font-medium truncate">{product.name}</p>
        <p className="text-blue-600 font-semibold">
          {product.price.toLocaleString("vi-VN")}đ
        </p>
      </div>
    </Link>
  );
}
