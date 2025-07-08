export default function formatPrice(price: number | string, currency: string = "₫"): string {
  const num = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(num) || num <= 0) return "Liên hệ";

  return num.toLocaleString("vi-VN") + " " + currency;
}
