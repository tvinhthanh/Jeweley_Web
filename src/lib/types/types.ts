// lib/types/index.ts

// Product
// export type Product = {
//   id: number;
//   slug: string;
//   name: string;
//   description: string;
//   price: number;
//   oldPrice?: number;
//   rating: number;
//   ratingCount: number;
//   sizes: string[];
//   colors?: string[];
//   images: string[];
//   image?: string;
// //   material?: string;
//   category: { id: number; slug: string; name: string }[];
//   type?: { id: number; slug: string; name: string }[];
// };

// Auth
export type UserLoginPayload = {
  username: string;
  password: string;
};

export type UserRegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
};

// Comment
export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  replies?: Comment[];
};

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  children?: Category[];
}

export type Products = {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  rating: number;
  ratingCount: number;
  sizes: string[];
  images: string[];
  description: string;
  colors?: string[];
};

export type Variation = {
  id: number;
  price: number;
  regular_price: number;
  sale_price: number;
  attributes: { [key: string]: string };
  image?: string;
};
export type CartItem = {
  product_id: number; // product_id
  quantity: number;
  variation?: {
    color?: string;
    size?: string;
  };
  snapshot?: {
    slug: string;
    name: string;
    image: string;
    price: unknown;
  };
};
export interface ShippingAddress {
  first_name: string;
  last_name: string;
  phone: string;
  address_1: string;
  city: string;
  country: string;
  state?: string;
  postcode?: string;
}

export type Coupon = {
  code: string;
  amount: string;
  type: string;
  limit_usage: number;
  limit_usage_per_user: number;
  used_by_user: number;
  expiry?: string | null;
  invalid: boolean;
};
export interface Order {
  id: number;
  total: string;
  status: string;
  created_at: string;
  items: {
    name: string;
    quantity: number;
    total: string;
  }[];
}

// export interface Comment {
//   avatar: string;
//   name: string;
//   rating: number;
//   text: string;
//   time: string;
//   objectId: string;
//   objectType: string;
// }
export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  rating: number;
  ratingCount: number;
  sizes: string[];
  colors: string[];
  images: string[];
  category: { id: number; name: string }[];
  type: string[];
  code: string;
  image?: string;
}
export interface BlogItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
}