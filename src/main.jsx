import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/cart-context";
import { AuthProvider } from "./context/auth-context";
import { UserProvider } from "./context/user-context"; // Import UserProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  </React.StrictMode>
);
