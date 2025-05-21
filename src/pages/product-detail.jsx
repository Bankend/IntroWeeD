// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import products from "../data/products"; // สมมติเราเก็บไว้ในไฟล์นี้
import { useCart } from "../context/cart-context";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <div className="p-6">ไม่พบสินค้านี้</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 shadow rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover rounded mb-6"
        />
        <h2 className="text-3xl font-bold text-green-900 mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl text-green-700 font-semibold mb-6">{product.price} บาท</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          เพิ่มใส่ตะกร้า
        </button>
      </div>
    </div>
  );
}
