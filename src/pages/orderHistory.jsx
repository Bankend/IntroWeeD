// src/pages/OrderHistory.jsx
import { useCart } from "../context/cart-context";

export default function OrderHistory() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return <div className="p-6 text-gray-500 text-center">ยังไม่มีประวัติการสั่งซื้อ</div>;
  }

  return (
    <div className="pt-20 max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-800">ประวัติการสั่งซื้อ</h2>
      {orders.map((order) => (
        <div key={order.id} className="mb-6 p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500 mb-2">วันที่: {order.date}</p>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-1">
              <span>{item.name} x {item.quantity}</span>
              <span>{item.price * item.quantity} บาท</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
