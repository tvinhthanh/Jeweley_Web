import api from "./api";

export const getAvailableCoupons = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/custom/v1/coupons", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
