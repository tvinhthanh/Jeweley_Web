/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCustomerAddress } from "@/services/authService";
import { CartItem, Coupon, ShippingAddress } from "@/lib/types/types";
import { createOrder } from "@/services/orderServices";
import { getAvailableCoupons } from "@/services/couponService";
import { clearCart } from "@/services/cartService";
import { useAppContext } from "@/context/AppContext";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [shipping, setShipping] = useState<ShippingAddress>({
    first_name: "",
    last_name: "",
    phone: "",
    address_1: "",
    city: "",
    country: "",
    state: "",
    postcode: "",
  });

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [items, setItems] = useState<CartItem[]>([]);
  const [shippingMethod, setShippingMethod] = useState("free");
  const [shippingCost, setShippingCost] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState<string>("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const router = useRouter();
  const { user } = useAppContext();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await getCustomerAddress();
        if (res?.shipping) {
          setShipping({
            first_name: res.shipping.first_name || "",
            last_name: res.shipping.last_name || "",
            phone: res.shipping.phone || "",
            address_1: res.shipping.address_1 || "",
            city: res.shipping.city || "",
            country: res.shipping.country || "",
            state: res.shipping.state || "",
            postcode: res.shipping.postcode || "",
          });
        }
      } catch (err) {
        console.error("Lỗi lấy địa chỉ shipping:", err);
      }
    };
    fetchAddress();
  }, []);
  useEffect(() => {
    let cost = 0;
    if (shippingMethod === "fast") cost = 200000;
    else if (shippingMethod === "store") cost = -Math.round(subtotal * 0.005);
    else cost = 0;
    setShippingCost(cost);
  }, [shippingMethod, subtotal]);

  useEffect(() => {
    const saved = localStorage.getItem("checkout_summary");
    if (saved) {
      const parsed = JSON.parse(saved);
      setItems(parsed.items || []);
      if (parsed.items?.length === 0) {
        alert("Giỏ hàng của bạn đang trống.");
        router.push("/categories");
        return;
      }
      setShippingMethod(parsed.shippingMethod || "free");
      setShippingCost(parsed.shippingCost || 0);
      setSubtotal(parsed.subtotal || 0);
      setTotal(parsed.total || 0);
      if (parsed.couponCode) setCouponCode(parsed.couponCode);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    const saved = localStorage.getItem("checkout_summary");
    if (saved) {
      const parsed = JSON.parse(saved);
      setItems(parsed.items || []);
      setShippingMethod(parsed.shippingMethod || "free");
      setShippingCost(parsed.shippingCost || 0);
      setSubtotal(parsed.subtotal || 0);
      setTotal(parsed.total || 0);
      if (parsed.couponCode) setCouponCode(parsed.couponCode);

      if (parsed.items?.length === 0) {
        alert("Giỏ hàng của bạn đang trống.");
        router.push("/");
        return;
      }
    } else {
      alert("Không tìm thấy dữ liệu thanh toán.");
      router.push("/");
      return;
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getAvailableCoupons();
        setCoupons(data || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách coupon:", err);
      }
    };
    fetchCoupons();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [couponCode, subtotal]);

  const calculateTotal = () => {
    const selected = coupons.find((c) => c.code === couponCode);
    let discount = 0;

    if (selected) {
      if (selected.type === "percent") {
        discount = subtotal * (parseFloat(selected.amount) / 100);
      } else {
        discount = parseFloat(selected.amount);
      }
    }

    const newTotal = Math.max(0, subtotal - discount + shippingCost);
    setTotal(newTotal);
  };
  console.log(user?.id, "user id");
  console.log(user?.email, "user email");
  useEffect(() => {
    calculateTotal();
  }, [couponCode, subtotal, shippingCost]);

  const handleChange = (key: keyof ShippingAddress, value: string) => {
    setShipping((prev) => ({ ...prev, [key]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!user?.id) {
      alert("Vui lòng đăng nhập trước khi đặt hàng.");
      return;
    }

    if (!shipping.first_name || !shipping.address_1) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng.");
      return;
    }

    if (paymentMethod === "credit") {
      // Kiểm tra thông tin thẻ
      if (
        cardNumber.trim().length < 12 ||
        !/^\d{2}\/\d{2}$/.test(expiryDate) ||
        cvc.trim().length < 3
      ) {
        alert("Vui lòng nhập đầy đủ và hợp lệ thông tin thẻ tín dụng.");
        return;
      }

      alert(
        "Chức năng thanh toán bằng thẻ đang phát triển. Vui lòng chọn thanh toán khi nhận hàng (COD)."
      );
      return;
    }

    try {
      const lineItems = items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      const selectedCoupon = coupons.find((c) => c.code === couponCode);
      const orderData = {
        payment_method: paymentMethod,
        payment_method_title:
          paymentMethod === "cod" ? "Thanh toán khi nhận hàng" : "Thẻ tín dụng",
        set_paid: false,
        customer_id: user?.id || 0,
        billing: {
          ...shipping,
          email: user?.email || "example@domain.com",
        },
        shipping: { ...shipping },
        line_items: lineItems,
        coupon_lines: selectedCoupon ? [{ code: selectedCoupon.code }] : [],
        shipping_lines: [
          {
            method_id: shippingMethod, // "fast", "store", "free"
            method_title:
              shippingMethod === "fast"
                ? "Giao hàng nhanh"
                : shippingMethod === "store"
                ? "Nhận tại cửa hàng"
                : "Giao hàng miễn phí",
            total: shippingCost.toString(),
            total_tax: "0",
          },
        ],
      };

      const res = await createOrder(orderData);
      console.log("Đặt hàng thành công:", res);
      await clearCart();
      localStorage.removeItem("checkout_summary");
      localStorage.setItem("last_order_id", res.id);
      router.push("/checkout/success");
    } catch (err: any) {
      // Coupon bị lỗi
      if (
        err?.response?.data?.message?.includes("coupon") ||
        err?.message?.includes("coupon")
      ) {
        alert("Coupon không hợp lệ hoặc đã hết lượt sử dụng.");
        // Xoá coupon hiện tại
        setCoupons((prev) =>
          prev.map((c) => (c.code === couponCode ? { ...c, invalid: true } : c))
        );
        setCouponCode("");
      } else {
        console.error("Lỗi khi đặt hàng:", err);
        alert("Đặt hàng thất bại. Vui lòng thử lại!");
      }
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-10">Thanh toán</h1>

      <div className="flex justify-center mb-12 gap-16">
        {["Giỏ hàng", "Chi tiết thanh toán", "Đặt hàng thành công"].map(
          (label, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm ${
                  i === 1
                    ? "bg-blue-600"
                    : i === 0
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs ${
                  i === 1 ? "font-semibold text-black" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <section className="border rounded p-6">
            <h2 className="font-semibold mb-4">Địa chỉ nhận hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={shipping.first_name}
                onChange={(e) => handleChange("first_name", e.target.value)}
                placeholder="First name"
                className="border p-2 rounded"
              />
              <input
                value={shipping.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
                placeholder="Last name"
                className="border p-2 rounded"
              />
              <input
                value={shipping.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Phone number"
                className="border p-2 rounded col-span-full"
              />
              <input
                value={shipping.address_1}
                onChange={(e) => handleChange("address_1", e.target.value)}
                placeholder="Street Address"
                className="border p-2 rounded col-span-full"
              />
              <input
                value={shipping.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="City"
                className="border p-2 rounded"
              />
              <input
                value={shipping.state}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="State"
                className="border p-2 rounded"
              />
              <input
                value={shipping.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Country"
                className="border p-2 rounded"
              />
              <input
                value={shipping.postcode}
                onChange={(e) => handleChange("postcode", e.target.value)}
                placeholder="Zip Code"
                className="border p-2 rounded"
              />
            </div>
          </section>

          <section className="border rounded p-6">
            <h2 className="font-semibold mb-4">Phương thức thanh toán</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "credit"}
                  onChange={() => setPaymentMethod("credit")}
                />
                Thẻ tín dụng
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Thanh toán khi nhận hàng
              </label>
              {paymentMethod === "credit" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <input
                    placeholder="1234 1234 1234"
                    className="border p-2 rounded col-span-full"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <input
                    placeholder="MM/YY"
                    className="border p-2 rounded"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                  <input
                    placeholder="CVC code"
                    className="border p-2 rounded"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                  />
                </div>
              )}
            </div>
          </section>

          <section className="border rounded p-6">
            <h2 className="font-semibold mb-4">Mã giảm giá</h2>

            {coupons.length === 0 ? (
              <p className="text-sm text-gray-500">Không có mã nào khả dụng</p>
            ) : (
              <select
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">-- Chọn mã giảm giá --</option>
                {coupons.map((coupon) => {
                  const disabled =
                    (coupon.limit_usage_per_user === 1 &&
                      coupon.used_by_user >= 1) ||
                    coupon.invalid;

                  const label =
                    coupon.type === "percent"
                      ? `Giảm ${coupon.amount}%`
                      : `Giảm ${Number(coupon.amount).toLocaleString(
                          "vi-VN"
                        )}₫`;

                  return (
                    <option
                      key={coupon.code}
                      value={coupon.code}
                      disabled={disabled}
                    >
                      {coupon.code.toUpperCase()} – {label}{" "}
                      {coupon.expiry ? `(HSD: ${coupon.expiry})` : ""}
                      {coupon.invalid ? " – Không hợp lệ" : ""}
                    </option>
                  );
                })}
              </select>
            )}
          </section>

          <button
            onClick={handlePlaceOrder}
            className="bg-blue-600 text-white w-full py-2 rounded mt-6 hover:bg-blue-700"
          >
            Đặt hàng
          </button>
        </div>

        <div className="lg:col-span-4 border rounded p-6 bg-white space-y-4">
          <p className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</p>
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-3 py-3 border-b">
              <Image
                src={item.snapshot?.image || "/placeholder.jpg"}
                width={64}
                height={64}
                alt={item.snapshot?.name || "Sản phẩm"}
                className="object-contain"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-semibold truncate max-w-[160px]">
                    {item.snapshot?.name}
                  </p>
                  <span className="text-sm font-bold whitespace-nowrap">
                    {Number(item.snapshot?.price || 0).toLocaleString("vi-VN")}₫
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {item.variation?.color} / {item.variation?.size}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span>Số lượng: {item.quantity}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="text-sm">
            <div className="flex justify-between">
              <span>Giao hàng</span>
              <span>
                {shippingMethod === "fast"
                  ? "200.000₫"
                  : shippingMethod === "store"
                  ? `-${Math.round(subtotal * 0.005).toLocaleString("vi-VN")}₫`
                  : "Miễn phí"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tổng phụ</span>
              <span>{subtotal.toLocaleString("vi-VN")}₫</span>
            </div>

            {couponCode && (
              <div className="flex justify-between text-green-600">
                <span>Giảm giá ({couponCode.toUpperCase()})</span>
                <span>
                  -
                  {(() => {
                    const selected = coupons.find((c) => c.code === couponCode);
                    if (!selected) return "0₫";
                    const discount =
                      selected.type === "percent"
                        ? subtotal * (parseFloat(selected.amount) / 100)
                        : parseFloat(selected.amount);
                    return `-${Math.round(discount).toLocaleString("vi-VN")}₫`;
                  })()}
                </span>
              </div>
            )}

            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Tổng</span>
              <span>{total.toLocaleString("vi-VN")}₫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
