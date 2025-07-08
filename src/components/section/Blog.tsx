"use client";

import Image from "next/image";
import { BlogItem } from "@/lib/types/types";

const blogList: BlogItem[] = [
  {
    id: 1,
    title: "TRANG SỨC HOT",
    description: "Những bộ sưu tập giá mang đậm chất riêng của...",
    image: "/images/blog-1.png",
    link: "#",
  },
  {
    id: 2,
    title: "TRANG SỨC CƯỚI",
    description: "Những bộ sưu tập giá mang đậm chất riêng của...",
    image: "/images/blog-1.png",
    link: "#",
  },
  {
    id: 3,
    title: "TRANG SỨC KIM CƯƠNG",
    description: "Những bộ sưu tập giá mang đậm chất riêng của...",
    image: "/images/blog-1.png",
    link: "#",
  },
];

export default function BlogSection() {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-6">
          Tin tức & Sự kiện
        </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogList.map((item) => (
          <div key={item.id} className="bg-white rounded overflow-hidden shadow-sm">
            <div className="relative h-52 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-700 mb-3">{item.description}</p>
              <a
                href={item.link}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Khám phá ngay &gt;
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
