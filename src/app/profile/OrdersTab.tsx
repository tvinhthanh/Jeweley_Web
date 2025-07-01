"use client";

export function OrderTab() {
  const orders = [
    { id: "#3456_768", date: "October 17, 2023", status: "Delivered", price: "$1234.00" },
    { id: "#3456_980", date: "October 11, 2023", status: "Delivered", price: "$345.00" },
    { id: "#3456_120", date: "August 24, 2023", status: "Delivered", price: "$2345.00" },
    { id: "#3456_030", date: "August 12, 2023", status: "Delivered", price: "$845.00" },
  ];

  return (
    <div className="overflow-x-auto text-gray-800">
      <h2 className="text-xl font-semibold mb-6">Lịch sử đơn hàng</h2>
      <table className="min-w-full border-t border-b border-gray-200 text-left">
        <thead className="bg-gray-50">
          <tr className="text-sm text-gray-500">
            <th className="py-3 px-4">Number ID</th>
            <th className="py-3 px-4">Dates</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-3 px-4 font-medium">{order.id}</td>
              <td className="py-3 px-4">{order.date}</td>
              <td className="py-3 px-4">{order.status}</td>
              <td className="py-3 px-4">{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
