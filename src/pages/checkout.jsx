// src/pages/Checkout.jsx
import { useCart } from "../context/cart-context";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  // เพิ่ม saveOrder
  const { cartItems, clearCart, saveOrder } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // 🔸 บันทึกคำสั่งซื้อ
    saveOrder({
      items: cartItems,
      total: totalPrice,
      date: new Date().toISOString(),
    });
    alert("✅ สั่งซื้อเรียบร้อย! ขอบคุณที่ใช้บริการ IntroWeeD 🌿");
    clearCart();
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-4 rounded bg-white shadow text-center text-gray-600">
        ยังไม่มีสินค้าที่จะชำระเงิน
      </div>
    );
  }

  return (
    <div className="pt-20 max-w-xl mx-auto p-4 rounded bg-white shadow">
      <h2 className="text-2xl font-bold mb-6 text-green-800">สรุปคำสั่งซื้อ</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="mb-4 border-b pb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">จำนวน {item.quantity} ชิ้น</p>
            </div>
            <p>{item.price * item.quantity} บาท</p>
          </div>
        </div>
      ))}
      <div className="text-right text-xl font-bold text-green-800 mb-6">
        รวมทั้งหมด: {totalPrice} บาท
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
      >
        ✅ ยืนยันการสั่งซื้อ
      </button>
    </div>
  );
}
