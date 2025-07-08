/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { getCustomerAddress, updateCustomerAddress } from "@/services/authService";

interface AddressInfo {
  name: string;
  phone: string;
  address: string;
  type: "billing" | "shipping";
  raw?: any;
}

export function AddressTab() {
  const [addresses, setAddresses] = useState<AddressInfo[]>([]);
  const [editingType, setEditingType] = useState<"billing" | "shipping" | null>(null);
  const [form, setForm] = useState<any>({});

  const fetchData = async () => {
    try {
      const res = await getCustomerAddress();
      const data: AddressInfo[] = [];

      if (res.billing?.first_name || res.billing?.address_1) {
        data.push({
          type: "billing",
          name: `${res.billing.first_name || ""} ${res.billing.last_name || ""}`.trim(),
          phone: res.billing.phone,
          address: `${res.billing.address_1}, ${res.billing.city}, ${res.billing.country}`,
          raw: res.billing,
        });
      }

      if (res.shipping?.first_name || res.shipping?.address_1) {
        data.push({
          type: "shipping",
          name: `${res.shipping.first_name || ""} ${res.shipping.last_name || ""}`.trim(),
          phone: res.shipping.phone,
          address: `${res.shipping.address_1}, ${res.shipping.city}, ${res.shipping.country}`,
          raw: res.shipping,
        });
      }

      setAddresses(data);
    } catch (error) {
      console.error("Lỗi khi tải địa chỉ:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item: AddressInfo) => {
    setEditingType(item.type);
    setForm(item.raw || {});
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!editingType) return;
    await updateCustomerAddress(editingType, form);
    setEditingType(null);
    fetchData();
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {addresses.map((item, index) => (
        <div
          key={index}
          className="flex-1 min-w-[250px] border border-gray-400 rounded-lg p-4 relative"
        >
          <div
            className="absolute top-2 right-2 flex items-center gap-1 text-gray-500 cursor-pointer hover:text-gray-800"
            onClick={() => handleEdit(item)}
          >
            <FaEdit size={14} />
            <span className="underline">Sửa</span>
          </div>

          <p className="text-sm text-gray-500 capitalize">{item.type} address</p>

          {editingType === item.type ? (
            <div className="mt-2 space-y-2">
              <input
                value={form.first_name || ""}
                onChange={(e) => handleChange("first_name", e.target.value)}
                placeholder="First name"
                className="border p-1 w-full"
              />
              <input
                value={form.last_name || ""}
                onChange={(e) => handleChange("last_name", e.target.value)}
                placeholder="Last name"
                className="border p-1 w-full"
              />
              <input
                value={form.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Phone"
                className="border p-1 w-full"
              />
              <input
                value={form.address_1 || ""}
                onChange={(e) => handleChange("address_1", e.target.value)}
                placeholder="Address"
                className="border p-1 w-full"
              />
              <input
                value={form.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="City"
                className="border p-1 w-full"
              />
              <input
                value={form.country || ""}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Country"
                className="border p-1 w-full"
              />
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                onClick={handleSave}
              >
                Lưu
              </button>
            </div>
          ) : (
            <>
              <p className="font-semibold">{item.name}</p>
              <p>{item.phone}</p>
              <p>{item.address}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
