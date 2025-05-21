import { useState } from "react";

export default function ProductList() {
  const [search, setSearch] = useState("");

  const products = [
    { id: 1, name: "กัญชาไฮบริด", price: 300 },
    { id: 2, name: "สายพันธุ์ซาติวา", price: 250 },
    { id: 3, name: "อินดิกาออร์แกนิค", price: 400 },
    { id: 4, name: "ออมาชิ", price: 500 },
  ];

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">รายการสินค้า</h2>

      <input
        type="text"
        placeholder="ค้นหาชื่อสินค้า..."
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div
              key={p.id}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-green-700">ราคา {p.price} บาท</p>
              <button className="mt-2 bg-green-600 text-white px-4 py-1 rounded">
                เพิ่มลงตะกร้า
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">ไม่พบสินค้าที่ค้นหา</p>
        )}
      </div>
    </div>
  );
}
