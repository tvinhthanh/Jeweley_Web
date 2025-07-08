"use client";

import Image from "next/image";

export default function HotJewelrySection() {
  return (
    <section className="bg-[#4476c6] text-white px-4">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Text Left */}
        <div className="space-y-4">
          <h2 className="text-5xl font-normal font-['SVN-Gilroy']">Trang sức hot</h2>
          <p className="text-xl leading-loose font-['SVN-Gilroy'] max-w-md">
            Những bộ sưu tập trang sức mang đậm chất riêng của những nhà thiết kế uy tín sẽ đến gần bạn hơn...
          </p>
          <div className="flex items-center gap-2 text-base cursor-pointer underline font-['SVN-Gilroy']">
            Khám phá ngay
            <div className="w-2 h-1.5 rotate-90 border border-white" />
          </div>
        </div>

        {/* Image Right - 2 ảnh nằm hàng ngang */}
        <div className="flex gap-4 items-end" >
          {/* Ảnh nhỏ bên trái */}
          <div className="relative w-[200px] h-[300px] rounded overflow-hidden shadow">
            <Image
              src="/images/hot-jewelry-1.png"
              alt="Trang sức 1"
              fill
              className="object-cover"
            />
          </div>

          {/* Ảnh lớn bên phải */}
          <div className="relative w-[400px] h-[550px] rounded overflow-hidden shadow">
            <Image
              src="/images/hot-jewelry-2.png"
              alt="Trang sức 2"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
