import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-100 text-sm text-gray-700 pt-8 pb-4 px-4">
      {/* Top columns */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div>
          <h4 className="font-semibold mb-2">SẢN PHẨM</h4>
          <ul className="space-y-1">
            <li>Trang sức</li>
            <li>Trang sức cưới</li>
            <li>Trang sức kim cương</li>
            <li>Trang sức cho nam</li>
            <li>Trang sức cho nữ</li>
            <li>Trang sức thiết kế cá nhân</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">LIÊN HỆ</h4>
          <ul className="space-y-1">
            <li>Mua Hàng: 1900 888 888</li>
            <li>0999 999 999</li>
            <li>0999 999 999</li>
            <li>Góp ý & Khiếu nại: 1900 888 888 (phím 1)</li>
            <li>support@sitecuaai.vn</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">CHÍNH SÁCH</h4>
          <ul className="space-y-1">
            <li>Chính sách giao hàng</li>
            <li>Chính sách bảo hành</li>
            <li>Chính sách đổi trả</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">KẾT NỐI VỚI CHÚNG TÔI</h4>
          <div className="flex gap-3 text-lg mt-2">
            <FaFacebook className="hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaYoutube className="hover:text-red-500 cursor-pointer" />
            <FaEnvelope className="hover:text-blue-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Subscribe section */}
      <div className="border-t border-blue-300 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="text-base font-semibold">Nhận tư vấn từ chúng tôi!</h4>
            <p className="text-sm text-gray-600">Đăng ký ngay bên dưới để nhận được sự hỗ trợ từ chúng tôi.</p>
          </div>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Họ và tên"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Nhận tư vấn
            </button>
          </form>
        </div>
      </div>

      {/* Logo */}
      <div className="border-t border-blue-300 pt-6 mt-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-gray-500 text-sm">© {new Date().getFullYear()} Jewelry Shop</div>
        <div className="flex items-center gap-2 font-bold text-lg">
          <span className="text-blue-600 text-2xl">📍</span> COMPANY
          <div className="text-xs font-normal text-gray-500">Your Logo Here</div>
        </div>
      </div>
    </footer>
  );
}
