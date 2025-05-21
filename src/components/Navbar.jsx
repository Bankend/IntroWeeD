import { useCart } from "../context/cart-context";

export default function Navbar() {
  const { cartItems } = useCart(); // ต้องเป็น cartItems
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav>
      <button>
        🛒 ตะกร้า <span>({totalCount})</span>
      </button>
    </nav>
  );
}