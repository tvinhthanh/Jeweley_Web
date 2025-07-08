"use client";

import Image from "next/image";

const features = [
  {
    icon: "/icons/shipping.svg",
    title: "Free Shipping",
    description: "Free shipping for orders over $130",
  },
  {
    icon: "/icons/money.svg",
    title: "Money Guarantee",
    description: "within 30 days for an exchange",
  },
  {
    icon: "/icons/support.svg",
    title: "Money Guarantee",
    description: "within 30 days for an exchange",
  },
  {
    icon: "/icons/payment.svg",
    title: "Flexible Payment",
    description: "Pay with multiple Credit cards",
  },
];

export default function ServiceFeaturesSection() {
  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 shadow-sm transition"
          >
            {/* Icon container fixed size */}
            <div className="w-20 h-20 flex items-center justify-center rounded mb-3">
              <Image
                src={item.icon}
                alt={item.title}
                width={60}
                height={60}
              />
            </div>
            <h4 className="font-semibold mb-1">{item.title}</h4>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
