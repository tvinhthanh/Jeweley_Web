"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import Image from "next/image";

const images = [
  {
    src: "/images/banner1.png",
    alt: "Banner 1",
    title: "Trang sức sang trọng & đẳng cấp",
  },
  {
    src: "/images/banner1.png",
    alt: "Banner 2",
    title: "Thiết kế tinh xảo, chất lượng hàng đầu",
  },
  {
    src: "/images/banner1.png",
    alt: "Banner 3",
    title: "Ưu đãi hấp dẫn chỉ hôm nay",
  },
    {
    src: "/images/banner1.png",
    alt: "Banner 1",
    title: "Trang sức sang trọng & đẳng cấp",
  },
  {
    src: "/images/banner1.png",
    alt: "Banner 2",
    title: "Thiết kế tinh xảo, chất lượng hàng đầu",
  },
  {
    src: "/images/banner1.png",
    alt: "Banner 3",
    title: "Ưu đãi hấp dẫn chỉ hôm nay",
  },
];

export default function BannerSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <section className="w-full">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="relative w-full h-[400px] md:h-[500px]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-white text-xl md:text-3xl font-bold text-center px-4">
                {img.title}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
