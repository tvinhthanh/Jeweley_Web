/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';

// ✅ Lấy danh sách đánh giá sản phẩm (KHÔNG cần login)
// services/reviews.ts

export const fetchProductReviews = async (
  productId: number,
  page = 1,
  limit = 10
) => {
  const res = await api.get("/custom/v1/product-comments", {
    params: {
      product_id: productId,
      page,
      limit,
    },
  });
  return res.data;
};


// ✅ Gửi đánh giá sản phẩm (CẦN login với Bearer Token)
export const submitProductReview = async (payload: {
  product_id: number;
  rating: number;
  text: string;
}) => {
  const token = localStorage.getItem('token');
  const res = await api.post('/custom/v1/add-review', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
