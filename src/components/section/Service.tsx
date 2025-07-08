"use client";

import Image from "next/image";

export default function Service() {
  const services = [
    {
      icon: "/icons/credit-card.svg",
      title: "Chế độ thu cũ hấp dẫn",
      desc: "Trả góp 0%, quà tặng và chiết khấu lớn",
    },
    {
      icon: "/icons/guarantee.svg",
      title: "Bảo hành trọn đời",
      desc: "Miễn phí làm sạch, sửa chữa suốt đời sản phẩm",
    },
    {
      icon: "/icons/delivery.svg",
      title: "Giao hàng toàn quốc",
      desc: "Giao nhanh, kiểm hàng trước khi thanh toán",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tiêu đề chính */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-2">
          Dịch Vụ
        </h2>
        <h3 className="text-xl md:text-2xl font-bold text-center text-black-900 mb-10">
          Thế giới lấp lánh của những quý cô hiện đại
        </h3>
        {/* Danh sách tiện ích */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {services.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image src={item.icon} alt={item.title} width={80} height={80} />
              <h4 className="font-semibold text-lg mt-4 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600 max-w-xs font-medium">{item.desc}</p>
              <p className="text-sm text-blue-700 mt-2 cursor-pointer hover:underline">
                Khám phá ngay &gt;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
