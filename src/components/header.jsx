import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useCart } from "../context/cart-context"; // เพิ่มบรรทัดนี้

export default function Header() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { cartItems } = useCart(); // เพิ่มบรรทัดนี้
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0); // เพิ่มบรรทัดนี้

  // ปรับ menuClass ไม่ให้ header กระตุกเวลา hover
  const menuClass =
    "px-2 py-1 rounded transition-colors duration-150 hover:bg-white hover:text-green-900 hover:border hover:border-white border border-transparent";

  return (
    <header className="bg-green-900 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow">
      <Link
        to="/"
        className="flex items-center text-2xl font-bold focus:outline-none gap-2"
        style={{ textDecoration: "none" }} // ป้องกันเส้นใต้ทุกกรณี
        tabIndex={0}
        onClick={(e) => {
          // ป้องกันการ reload หน้าเดิม
          if (window.location.pathname === "/") {
            e.preventDefault();
            // ใช้ฟังก์ชัน scroll แบบ custom เพื่อความลื่น
            const smoothScroll = () => {
              const c = document.documentElement.scrollTop || document.body.scrollTop;
              if (c > 0) {
                window.scrollTo(0, c - c / 12); // ปรับเลขนี้ให้ช้าหรือเร็วขึ้นได้
                requestAnimationFrame(smoothScroll);
              }
            };
            smoothScroll();
          }
          // ถ้าไม่ใช่หน้าแรก ให้ปล่อยให้ Link ทำงานตามปกติ
        }}
      >
        <span role="img" aria-label="weed">🌿</span>
        IntroWeeD
      </Link>
      {/* Hamburger button */}
      <button
        className="md:hidden block focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
      {/* Desktop nav */}
      <nav className="space-x-4 hidden md:flex items-center">
        <Link to="/" className={menuClass}>หน้าหลัก</Link>
        <Link to="/shop" className={menuClass}>ร้านค้า</Link>
        <Link to="/cart" className={menuClass}>
          ตะกร้า
          <span style={{ marginLeft: 4, color: "#fff", background: "#22c55e", borderRadius: "999px", padding: "2px 8px", fontSize: "0.9em" }}>
            {totalCount}
          </span>
        </Link>
        <Link to="/checkout" className={menuClass}>ชำระเงิน</Link>
        <Link to="/orders" className={menuClass}>ประวัติการสั่งซื้อ</Link>
        {user ? (
          <>
            <span className="text-sm">👋 {user.email}</span>
            <button onClick={() => signOut(auth)} className="underline">
              ออกจากระบบ
            </button>
          </>
        ) : (
          <Link to="/login" className={menuClass}>เข้าสู่ระบบ</Link>
        )}
      </nav>
      {/* Mobile nav */}
      {open && (
        <nav className="absolute top-16 left-0 w-full bg-green-900 text-white flex flex-col items-center space-y-4 py-4 z-50 md:hidden shadow-lg rounded-b">
          <Link to="/" className={menuClass + " w-11/12 text-center"} onClick={() => setOpen(false)}>หน้าหลัก</Link>
          <Link to="/shop" className={menuClass + " w-11/12 text-center"} onClick={() => setOpen(false)}>ร้านค้า</Link>
          <Link to="/cart" className={menuClass + " w-11/12 text-center"} onClick={() => setOpen(false)}>
            ตะกร้า
            <span style={{ marginLeft: 4, color: "#fff", background: "#22c55e", borderRadius: "999px", padding: "2px 8px", fontSize: "0.9em" }}>
              {totalCount}
            </span>
          </Link>
          <Link to="/checkout" className={menuClass + " w-11/12 text-center"} onClick={() => setOpen(false)}>ชำระเงิน</Link>
          <Link to="/orders" className={menuClass + " w-11/12 text-center"} onClick={() => setOpen(false)}>
            ประวัติการสั่งซื้อ
          </Link>
          {user ? (
            <>
              <span className="text-sm">👋 {user.email}</span>
              <button onClick={() => { signOut(auth); setOpen(false); }} className="underline">
                ออกจากระบบ
              </button>
            </>
          ) : (
            <Link to="/login" className={menuClass + " w-11/12 text-center"} onClick={() => setOpen(false)}>เข้าสู่ระบบ</Link>
          )}
        </nav>
      )}
    </header>
  );
}
