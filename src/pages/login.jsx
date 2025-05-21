import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err) {
      alert("เกิดข้อผิดพลาด: " + err.message);
    }
  };

  return (
    <div className="pt-20 max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl mb-4 text-green-800 font-bold">
        {isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="อีเมล"
          className="w-full p-3 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          className="w-full p-3 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          {isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
        </button>
      </form>
      <button
        onClick={() => setIsRegister(!isRegister)}
        className="text-sm text-green-700 mt-4 underline"
      >
        {isRegister ? "มีบัญชีแล้ว? เข้าสู่ระบบ" : "ยังไม่มีบัญชี? สมัครเลย"}
      </button>
    </div>
  );
}
