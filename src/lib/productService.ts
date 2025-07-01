
interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  type: string;
}

const fakeProducts: Product[] = [
  {
    id: "1",
    name: "Nhẫn Kim Cương",
    image: "/images/products/ring1.jpg",
    price: 4720000,
    type: "nhan-kim-cuong",
  },
  {
    id: "2",
    name: "Bông Tai Đính Đá",
    image: "/images/products/earring1.jpg",
    price: 2150000,
    type: "bong-tai",
  },
  {
    id: "3",
    name: "Lắc Tay Nữ",
    image: "/images/products/bracelet1.jpg",
    price: 3890000,
    type: "lac-tay",
  },
  {
    id: "4",
    name: "Dây Chuyền Đính Kim Cương",
    image: "/images/products/necklace1.jpg",
    price: 5900000,
    type: "mat-day-co",
  },
  {
    id: "5",
    name: "Nhẫn Cưới Vàng Trắng",
    image: "/images/products/ring2.jpg",
    price: 6280000,
    type: "nhan-kim-cuong",
  },
];

export async function getProductsByType(slug: string) {
  // Giả lập delay và lọc theo slug
  return fakeProducts.filter((product) => product.type === slug);
}
