/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { DefaultSeo } from "next-seo";
import SEO from "@/next-seo.config";

import { getAllProducts } from "@/services/productService";
import { Product } from "@/lib/types/types";

import BannerSlider from "@/components/Banner";
import ProductFeatureRSection from "@/components/product/ProductFeatureSection";
import ProductFeatureLSection from "@/components/product/ProductFeatureLSection";
import ProductList from "@/components/product/ProductList";
import ProductShowcase from "@/components/product/ProductShowcase";
import HotJewelrySection from "@/components/section/HotJewelrySection";
import ServiceFeaturesSection from "@/components/section/ServiceFeaturesSection";
import SectionImageWithText from "@/components/section/ImageWithText";
import TypeSection from "@/components/section/Type";
import StoreNetwork from "@/components/section/StoreNetwork";
import BlogSection from "@/components/section/Blog";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err: any) {
        setError("Không thể lấy dữ liệu sản phẩm.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <DefaultSeo {...SEO} />
      <main>
        <BannerSlider />
        <h1 className="text-2xl font-bold text-center mt-10">Trang chủ Jewelry</h1>
        <ServiceFeaturesSection />
        <HotJewelrySection />

        {loading ? (
          <p className="text-center py-10">Đang tải sản phẩm...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">{error}</p>
        ) : (
          <>
            <ProductShowcase
              type="list"
              title="Bộ sưu tập Audax Rosa"
              banner={["/images/banner-diamond2.png", "/images/banner-diamond1.png"]}
              products={products}
            />
            <ProductShowcase
              type="collection"
              title="Bộ sưu tập My First Diamond"
              banner="/images/banner-diamond.png"
              products={products}
            />
            <ProductFeatureRSection
              title="TRANG SỨC CƯỚI"
              description="Những bộ sưu tập trang sức mang đậm chất riêng của những nhà thiết kế uy tín sẽ đem đến cảm xúc..."
              imgLeft="/images/hero1.png"
              imgRight="/images/hero2.png"
            />
            <ProductList products={products} displayMode="scroll" />
            <ProductFeatureLSection
              title="SẢN PHẨM KHUYẾN MÃI"
              description="Thêm chút ngọt ngào cho người yêu, cho mẹ, hoặc đơn giản là cho chính mình"
              imgLeft="/images/hero3.png"
              imgRight="/images/hero4.png"
            />
            <ProductList products={products} displayMode="scroll" />
          </>
        )}

        <SectionImageWithText
          title="Kim Cương GIA"
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
        <TypeSection />
        <BlogSection />
        <StoreNetwork />
      </main>
    </>
  );
}
