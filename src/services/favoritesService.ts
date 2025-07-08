/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';
import { Product } from '@/lib/types/types';

export interface ToggleFavoriteResult {
  success: boolean;
  message: string;
  favorites: number[];
}

// ✅ Lấy danh sách sản phẩm yêu thích
export const getFavorites = async (): Promise<Product[]> => {
  try {
    const res = await api.get('/custom/v1/favorite');
    return res.data as Product[];
  } catch (error) {
    console.error('getFavorites error:', error);
    return [];
  }
};

// ✅ Thêm sản phẩm vào yêu thích
export const addFavorite = async (
  productId: number
): Promise<ToggleFavoriteResult> => {
  try {
    const res = await api.post('/custom/v1/favorite', { product_id: productId });
    return res.data;
  } catch (error: any) {
    console.error('addFavorite error:', error);
    throw new Error(error?.response?.data?.message || 'Lỗi khi thêm vào yêu thích');
  }
};

// ✅ Xóa sản phẩm khỏi yêu thích
export const removeFavorite = async (
  productId: number
): Promise<ToggleFavoriteResult> => {
  try {
    const token = localStorage.getItem('token'); // hoặc từ context nếu có

    const res = await api.delete(`/custom/v1/favorite/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data as ToggleFavoriteResult;
  } catch (error: any) {
    console.error("removeFavorite error:", error);
    const message =
      error?.response?.data?.message || "Lỗi khi xoá khỏi danh sách yêu thích.";
    throw new Error(message);
  }
};