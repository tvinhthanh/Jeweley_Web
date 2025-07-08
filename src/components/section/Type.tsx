"use client";

import Image from "next/image";
import Link from "next/link";

 const productTypes = [
  {
    name: "Nhẫn kim cương",
    slug: "nhan-kim-cuong",
    image: "/images/types/ring.png",
  },
  {
    name: "Bông tai",
    slug: "bong-tai",
    image: "/images/types/earring.png",
  },
  {
    name: "Lắc tay",
    slug: "lac-tay",
    image: "/images/types/bracelet.png",
  },
  {
    name: "Vòng cổ",
    slug: "vong-co",
    image: "/images/types/necklace.png",
  },
  {
    name: "Mặt dây cổ",
    slug: "mat-day-co",
    image: "/images/types/pendant.png",
  },
];

export default function TypeSection() {
  return (
    <section className="py-12 px-4 text-center">
      <h2 className="text-xl font-semibold mb-1">Có thể bạn đang tìm!</h2>
      <p className="text-sm text-gray-500 mb-8">
        Thế giới lấp lánh của những quý cô hiện đại
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-screen-xl mx-auto">
        {productTypes.map((item) => (
          <Link
            key={item.slug}
            href={`/type/${item.slug}`}
            className="flex flex-col items-center hover:opacity-80 transition"
          >
            <div className="w-[100px] h-[100px] relative mb-2">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
