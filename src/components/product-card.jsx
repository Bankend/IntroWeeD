import { useState, useEffect } from "react";
import { useCart } from "../context/cart-context";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const found = cart?.find((item) => item.id === product.id);
    setProductCount(found ? found.quantity : 0);
    if (found) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [cart, product.id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  // ตัวอย่างป้ายขายดี/ใหม่
  const isBestSeller = product.id === 1 || product.id === 2;
  const isNew = product.id === 4;

  // สี badge ตามประเภท
  const typeColor = {
    Indica: "bg-purple-100 text-purple-700",
    Sativa: "bg-yellow-100 text-yellow-700",
    Hybrid: "bg-green-100 text-green-700",
    "ไม่ระบุแน่ชัด": "bg-gray-100 text-gray-700",
  }[product.type] || "bg-gray-100 text-gray-700";

  // เพิ่ม emoji ในคำอธิบาย
  const highlight = {
    Indica: "🌙",
    Sativa: "🌞",
    Hybrid: "🌀",
  }[product.type] || "";

  return (
    <div className="rounded-2xl shadow-xl bg-white hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border border-green-100 p-6 flex flex-col items-center relative group">
      {/* Toast Popup */}
      {showToast && (
        <div className="fixed top-8 right-8 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <span role="img" aria-label="cart">🛒</span>
          เพิ่มลงตะกร้าแล้ว! (ในตะกร้านี้ {productCount} ชิ้น)
        </div>
      )}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${typeColor}`}>
          {product.type}
        </span>
        {isBestSeller && (
          <span className="bg-yellow-400 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow">ขายดี</span>
        )}
        {isNew && (
          <span className="bg-blue-400 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow">ใหม่!</span>
        )}
      </div>
      <img
        src={product.image}
        alt={product.name}
        className="rounded-xl w-full h-40 object-cover mb-4 shadow-md group-hover:scale-105 transition-transform"
        style={{ background: "#e0f2f1" }}
      />
      <h3 className="text-xl font-bold text-green-800 mb-2">{product.name}</h3>
      <p className="text-gray-700 text-sm mb-4 text-center font-medium">
        <span className="mr-1">{highlight}</span>
        <span className="font-semibold text-green-700">{product.shortDescription}</span>
      </p>
      <div className="text-lg font-bold text-green-700 mb-4">{product.price} บาท/กรัม</div>
      <button
        className="w-full bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold py-2 rounded-xl shadow hover:from-green-600 hover:to-green-500 transition-all mb-2"
        onClick={handleAddToCart}
      >
        เพิ่มใส่ตะกร้า
      </button>
      <Link to={`/product/${product.id}`}>
        <button className="w-full bg-gray-50 text-green-700 font-medium py-2 rounded-xl border border-green-100 hover:bg-green-50 transition-all">
          ดูรายละเอียด
        </button>
      </Link>
    </div>
  );
}
