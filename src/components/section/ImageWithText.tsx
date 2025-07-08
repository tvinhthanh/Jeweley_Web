"use client";

import Image from "next/image";
import clsx from "clsx";

interface Props {
  title: string;
  description?: string;
  image: string;
  linkText?: string;
  linkHref?: string;
  contentPosition?: "left" | "right";
  bgColor?: string;
}

export default function SectionImageWithText({
  title,
  description,
  image,
  linkText = "Khám phá ngay >",
  linkHref = "#",
  contentPosition = "left",
  bgColor = "#f8f8f8",
}: Props) {
  const isLeft = contentPosition === "left";

  return (
    <div className="relative">
      {/* Section với ảnh nằm trong khung center */}
      <section className="relative h-[300px] md:h-[400px] lg:h-[500px] flex justify-center">
        <div className="relative w-full max-w-screen-xl h-full ">
          {/* Background image */}
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />

          {/* Overlay nhẹ */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: bgColor, opacity: 0.2 }}
          ></div>

          {/* Content trên ảnh */}
          <div
            className={clsx(
              "absolute inset-0 px-4 flex items-center",
              isLeft ? "justify-start" : "justify-end"
            )}
          >
            <div className="p-6 max-w-md">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
              {description && (
                <p className="text-gray-700 mb-3">{description}</p>
              )}
              <a
                href={linkHref}
                className="inline-block text-sm font-medium text-blue-700 hover:underline"
              >
                {linkText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nền trắng phía dưới để tách section */}
      <div className="bg-white h-4 md:h-6 lg:h-8 w-full"></div>
    </div>
  );
}
