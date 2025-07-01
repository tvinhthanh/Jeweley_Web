"use client";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  imgLeft: string;
  imgRight: string;
}

export default function ProductFeatureLSection({
  title,
  description,
  imgLeft,
  imgRight,
}: Props) {
  return (
    <section className="bg-[#4D70CC] text-white py-12 relative">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text content */}
        <div className="flex-1 space-y-4 md:order-1 pr-24">
          <h2 className="text-5xl font-normal font-['SVN-Gilroy']">{title}</h2>
          <p className="text-xl leading-loose font-['SVN-Gilroy'] max-w-md">
            {description}
          </p>
          <div className="flex items-center gap-2 text-base cursor-pointer underline font-['SVN-Gilroy']">
            Khám phá ngay
            <div className="w-2 h-1.5 rotate-90 border border-white" />
          </div>
        </div>

        {/* Image stack */}
        <div className="relative w-96 h-[500px] md:order-2">
          <Image
            src={imgLeft}
            alt="Image Left"
            width={384}
            height={500}
            className="rounded shadow-md object-cover"
          />
          <Image
            src={imgRight}
            alt="Image Right"
            width={284}
            height={384}
            className="absolute w-72 h-96 top-[60px] right-[350px] rounded shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
