import { FaTimes } from "react-icons/fa";
import Image from "next/image";

const favorites = [
  {
    id: 1,
    name: "Nhẫn Kim cương Vàng Trắng 14K",
    code: "My First Diamond - MFDB52689",
    price: 19945000,
    image: "/images/ring.png", // Đảm bảo file nằm trong public/images
  },
  // Thêm nhiều mục nếu muốn...
];

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + " ₫";
}

export default function FavoritesTab() {
  return (
    <div className="text-white">
      <div className="grid grid-cols-12 py-4 border-b border-gray-600 font-semibold text-sm text-gray-400">
        <div className="col-span-6">Product</div>
        <div className="col-span-3">Price</div>
        <div className="col-span-3">Action</div>
      </div>

      {favorites.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-12 items-center py-4 border-b border-gray-700 text-sm"
        >
          {/* Xóa + Product */}
          <div className="col-span-6 flex items-center gap-4">
            <button className="text-gray-400 hover:text-red-500">
              <FaTimes />
            </button>
            <div className="relative w-16 h-16">
              <Image
                src={item.image}
                alt={item.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div>
              <p className="text-white">{item.name}</p>
              <p className="text-gray-400 text-xs">{item.code}</p>
            </div>
          </div>

          {/* Price */}
          <div className="col-span-3 text-gray-300 font-semibold">
            {formatPrice(item.price)}
          </div>

          {/* Action */}
          <div className="col-span-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
