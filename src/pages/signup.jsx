import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-800 text-center">สมัครสมาชิก</h2>
      {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-green-700 text-white py-2 rounded hover:bg-green-800"
        >
          สมัครสมาชิก
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        มีบัญชีอยู่แล้ว? <Link to="/login" className="text-green-700 underline">เข้าสู่ระบบ</Link>
      </div>
    </div>
  );
}
