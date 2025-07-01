"use client";

import Image from "next/image";
import Link from "next/link";

export default function StoreNetwork() {
  return (
    <section className="bg-white px-4 py-8">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-6 items-center border rounded overflow-hidden shadow-sm">
        {/* Hình ảnh bên trái */}
        <div className="relative h-[250px] md:h-[350px] lg:h-[400px] w-full">
          <Image
            src="/images/store-network.png" // thay bằng đường dẫn ảnh thật
            alt="Hệ thống cửa hàng"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Nội dung bên phải */}
        <div className="p-6 md:p-10 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Hệ thống cửa hàng</h2>
          <p className="text-gray-700">
            Thế giới trang sức cùng không gian mua sắm tuyệt vời đang chờ bạn ghé thăm.
          </p>
          <Link
            href="/store-locator"
            className="inline-block text-sm font-medium text-blue-700 hover:underline"
          >
            Tìm cửa hàng gần bạn &gt;
          </Link>
        </div>
      </div>
    </section>
  );
}
