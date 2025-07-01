import { FaEdit } from "react-icons/fa";

export function AddressTab() {
  const addresses = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0123456789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
    },
    {
      id: 2,
      name: "Trần Thị B",
      phone: "0987654321",
      address: "456 Đường XYZ, Quận 3, TP.HCM",
    },
  ];

  return (
    <div className="flex gap-4">
      {addresses.map((item) => (
        <div
          key={item.id}
          className="flex-1 border border-gray-400 rounded-lg p-4 relative"
        >
          <div className="absolute top-2 right-2 flex items-center gap-1 text-gray-500 cursor-pointer hover:text-gray-800">
            <FaEdit size={14} />
            <span className="underline">Sửa</span>
          </div>
          <p className="font-semibold">{item.name}</p>
          <p>{item.phone}</p>
          <p>{item.address}</p>
        </div>
      ))}
    </div>
  );
}
