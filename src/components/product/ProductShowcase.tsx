"use client";

import Image from "next/image";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types/types";
import { useRouter } from "next/navigation";

interface Props {
  title?: string;
  description?: string;
  banner?: string | string[];
  products: Product[];
  type: "collection" | "list";
}

export default function ProductShowcase({
  title,
  description,
  banner,
  products,
  type,
}: Props) {
  const router = useRouter();

  const handleSeeMore = () => {
    router.push("/category/all");
  };

  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Tiêu đề và mô tả */}
        {title && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-1">{title}</h2>
            {description && (
              <p className="text-gray-600 text-sm">{description}</p>
            )}
          </div>
        )}

        {/* Collection Mode */}
        {type === "collection" ? (
          <>
            {typeof banner === "string" && (
              <div className="mb-6">
                <Image
                  src={banner}
                  alt={title || "Collection banner"}
                  width={1200}
                  height={300}
                  className="w-full rounded shadow object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.slice(0, 4).map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  slug={p.slug}
                  title={p.name}
                  image={p.images[0] || "/images/ring.png"}
                  price={p.price}
                  code={p.code}
                />
              ))}

              <div className="col-span-full text-center mt-2">
                <button
                  className="px-6 py-2 border text-sm rounded hover:bg-gray-100"
                  onClick={handleSeeMore}
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </>
        ) : (
          // List Mode
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="flex flex-col gap-4">
              {Array.isArray(banner)
                ? banner.slice(0, 2).map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      alt={`List banner ${idx + 1}`}
                      width={600}
                      height={300}
                      className="w-full rounded shadow object-cover"
                    />
                  ))
                : typeof banner === "string" && (
                    <Image
                      src={banner}
                      alt="List banner"
                      width={600}
                      height={600}
                      className="w-full rounded shadow object-cover"
                    />
                  )}
            </div>

            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {products.slice(0, 6).map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  slug={p.slug}
                  title={p.name}
                  image={p.images[0] || "/images/ring.png"}
                  price={p.price}
                  code={p.code}
                />
              ))}

              <div className="col-span-full text-center mt-2">
                <button
                  className="px-6 py-2 border text-sm rounded hover:bg-gray-100"
                  onClick={handleSeeMore}
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
