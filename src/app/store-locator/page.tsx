"use client";

import { useState } from "react";

interface Store {
  id: number;
  name: string;
  address: string;
  phone: string;
}

export default function StoreLocatorPage() {
  const stores: Store[] = [
    {
      id: 1,
      name: "Cửa hàng Diamond Plaza",
      address: "34 Lê Duẩn, Quận 1, TP.HCM",
      phone: "028 1234 5678",
    },
    {
      id: 2,
      name: "Cửa hàng Vincom Hà Nội",
      address: "191 Bà Triệu, Hai Bà Trưng, Hà Nội",
      phone: "024 9876 5432",
    },
    {
      id: 3,
      name: "Cửa hàng Aeon Mall Bình Tân",
      address: "01 Đường số 17A, Bình Tân, TP.HCM",
      phone: "028 8765 4321",
    },
  ];

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleClick = (address: string) => {
    setSelectedAddress(address);
  };

  const mapUrl = selectedAddress
    ? `https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=${encodeURIComponent(
        selectedAddress
      )}`
    : null;

  return (
    <div className="max-w-screen-md mx-auto px-4 py-10 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Hệ thống cửa hàng</h2>

      <ul className="space-y-4">
        {stores.map((store) => (
          <li
            key={store.id}
            onClick={() => handleClick(store.address)}
            className="cursor-pointer border p-4 rounded hover:shadow transition bg-white"
          >
            <h3 className="font-semibold">{store.name}</h3>
            <p className="text-sm text-gray-600">{store.address}</p>
            <p className="text-sm text-gray-500">Điện thoại: {store.phone}</p>
          </li>
        ))}
      </ul>

      {mapUrl && (
        <div className="mt-6 w-full aspect-[16/9]">
          <iframe
            title="Google Map"
            src={mapUrl}
            allowFullScreen
            loading="lazy"
            className="w-full h-full rounded shadow"
          />
        </div>
      )}
    </div>
  );
}
