// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../context/user-context";

export default function ProtectedRoute({ children }) {
  const { user } = useUser();

  if (!user) {
    // ถ้ายังไม่ได้ล็อกอิน → redirect ไป /login
    return <Navigate to="/login" />;
  }

  // ถ้าล็อกอินแล้ว → แสดงเนื้อหาได้
  return children;
}
