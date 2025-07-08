interface AvatarUrls {
  full: string;
  24: string;
  48: string;
  96: string;
}

interface UserLinks {
  self: { href: string }[];
  collection: { href: string }[];
}

export interface User {
  id: number;
  name: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  simple_local_avatar?: { full?: string };
  description?: string;
  link?: string;
  slug?: string;
  avatar_urls?: AvatarUrls;
  is_super_admin?: boolean;
  meta?: Record<string, unknown>; // chứa các thông tin như first_name, last_name, ...
  woocommerce_meta?: Record<string, unknown>; // giữ dạng động để khỏi cần khai báo dài dòng
  _links?: UserLinks;
}
