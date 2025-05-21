import { useState } from "react";
import ProductCard from "../components/product-card";
import products from "../data/products"; // ใช้ข้อมูลกลาง

export default function Shop() {
  const [filter, setFilter] = useState("ทั้งหมด");

  const filterOptions = ["ทั้งหมด", "Indica", "Sativa", "Hybrid"];
  const filteredProducts =
    filter === "ทั้งหมด"
      ? products
      : products.filter((p) =>
          p.type.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-green-900 mb-2 flex items-center gap-2 drop-shadow">
          <span role="img" aria-label="weed">🌿</span> ร้านค้ากัญชา
        </h2>
        <p className="text-green-800 mb-6 text-lg font-medium">
          คัดสรรสายพันธุ์เด็ดเพื่อคุณ สดใหม่ ส่งไว ปลอดภัยทุกออเดอร์
        </p>
        {/* Filter Bar */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              className={`px-4 py-2 rounded-full border font-semibold transition-all
                ${filter === opt
                  ? "bg-green-500 text-white shadow"
                  : "bg-white text-green-700 border-green-200 hover:bg-green-100"}`}
              onClick={() => setFilter(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-12">ไม่พบสินค้าตามที่เลือก</div>
        )}
      </div>
    </div>
  );
}
