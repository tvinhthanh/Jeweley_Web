"use client";

import { DefaultSeo } from "next-seo";
import SEO from "@/next-seo.config";
import BannerSlider from "@/components/Banner";
// import ProductFeatureLSection from "@/components/product/ProductHeroSection1";
import ProductFeatureRSection from "@/components/product/ProductFeatureSection";
import ProductList from "@/components/product/ProductList";
import ProductShowcase from "@/components/product/ProductShowcase";
import HotJewelrySection from "@/components/HotJewelrySection";
import ServiceFeaturesSection from "@/components/ServiceFeaturesSection";
import SectionImageWithText from "@/components/ImageWithText";
import TypeSection from "@/components/Type";
import ProductFeatureLSection from "@/components/product/ProductFeatureLSection";
import StoreNetwork from "@/components/section/StoreNetwork";
// import StoreNetwork from "@/components/StoreNetwork";

const weddingProducts = [
  {
    name: "Nhẫn cưới vàng 18K trắng",
    image: "/assets/images/ring.png",
    price: 19945000,
  },
  {
    name: "Nhẫn cưới kim cương sang trọng",
    image: "/assets/images/ring.png",
    price: 25400000,
  },
  {
    name: "Nhẫn đôi cưới thiết kế Hàn",
    image: "/assets/images/ring.png",
    price: 17900000,
  },
  {
    name: "Nhẫn cưới trơn cao cấp",
    image: "/assets/images/ring.png",
    price: 19450000,
  },
  {
    name: "Nhẫn cưới đính đá quý",
    image: "/assets/images/ring.png",
    price: 23400000,
  },
  {
    name: "Nhẫn cưới trơn cao cấp",
    image: "/assets/images/ring.png",
    price: 19450000,
  },
  {
    name: "Nhẫn cưới đính đá quý",
    image: "/assets/images/ring.png",
    price: 23400000,
  },
];
const saleProducts = [
  {
    name: "Nhẫn vàng ưu đãi tháng 6",
    image: "/assets/images/ring.png",
    price: 14900000,
  },
  {
    name: "Vòng tay nữ giảm giá 20%",
    image: "/assets/images/ring.png",
    price: 13500000,
  },
  {
    name: "Bông tai ngọc trai sale",
    image: "/assets/images/ring.png",
    price: 11000000,
  },
  {
    name: "Dây chuyền thiết kế giảm sốc",
    image: "/assets/images/ring.png",
    price: 9900000,
  },
  {
    name: "Nhẫn cưới basic ưu đãi",
    image: "/assets/images/ring.png",
    price: 12900000,
  },
];
export default function Home() {
  return (
    <>
      <DefaultSeo {...SEO} />
      <main>
        <BannerSlider />
        <h1 className="text-2xl font-bold text-center mt-10">
Trang chủ Jewelry
</h1>
<ServiceFeaturesSection/>
        <HotJewelrySection/>
        {/* Add more sections below */}
<ProductShowcase
          type="list"
          title="Bộ sưu tập Audax Rosa"
          banner={[
            "/images/banner-diamond2.png",
            "/images/banner-diamond1.png",
          ]}
          products={weddingProducts}
        />
        <ProductShowcase
          type="collection"
          title="Bộ sưu tập My First Diamond"
          banner="/images/banner-diamond.png"
          products={weddingProducts}
        />

        <ProductShowcase
          type="list"
          title="Bộ sưu tập Audax Rosa"
          banner={[
            "/images/banner-diamond2.png",
            "/images/banner-diamond1.png",
          ]}
          products={weddingProducts}
        />
        <ProductFeatureRSection
          title="TRANG SỨC CƯỚI"
          description="Những bộ sưu tập trang sức mang đậm chất riêng của những nhà thiết kế uy tín sẽ đem đến cảm xúc..."
          imgLeft="/images/hero1.png"
          imgRight="/images/hero2.png"
                  />
        <ProductList products={weddingProducts} displayMode="loadMore" />
        <ProductFeatureLSection 
          title="SẢN PHẨM KHUYẾN MÃI"
          description="Thêm chút ngọt ngào cho người yêu, cho mẹ, hoặc đơn giản là cho chính mình"
          imgLeft="/images/hero3.png"
          imgRight="/images/hero4.png"
          />
        <ProductList products={saleProducts} displayMode="scroll" />
        <SectionImageWithText
          title="KIM CƯƠNG GIA"
          description="Kim cương thiên nhiên GIA được tuyển chọn dành riêng cho bạn..."
          image="/images/diamond.png"
          contentPosition="left"
        />

        <SectionImageWithText
          title="Bạn muốn thiết kế riêng"
          description="Khám phá dịch vụ thiết kế riêng miễn phí của chúng tôi nhé!"
          image="/images/custom-design.png"
          contentPosition="right"
          bgColor="#f0fff7"
        />
        <TypeSection/>
        <StoreNetwork/>
      </main>
    </>
  );
}