import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Shop from "./pages/shop";
import Cart from "./pages/cart";
import Login from "./pages/login";
import ProductDetail from "./pages/product-detail";
import Checkout from "./pages/checkout";
import Signup from "./pages/signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/cart-context";
import Footer from "./components/footer";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}