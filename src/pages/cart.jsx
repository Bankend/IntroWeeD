import { useCart } from "../context/cart-context";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="pt-20 max-w-xl mx-auto p-4 rounded bg-white shadow">
      <h2 className="text-3xl font-bold text-green-900 mb-4">ตะกร้าสินค้า</h2>

      {cartItems.length === 0 ? (
        <p>ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded bg-gray-50"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>
                  {item.quantity} x {item.price} บาท
                </p>
              </div>
              <button
                className="text-red-600 font-bold"
                onClick={() => removeFromCart(item.id)}
              >
                ลบ
              </button>
            </div>
          ))}
          <div className="text-right text-xl font-bold text-green-800 mt-6">
            รวมทั้งสิ้น: {total} บาท
          </div>
          <Link to="/checkout">
            <button className="mt-4 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
              ไปชำระเงิน
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
