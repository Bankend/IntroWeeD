import products from "../data/products"; // สมมติว่ามีไฟล์ products.js หรือ products.json
import ProductCard from "../components/product-card"; // สมมติว่ามีคอมโพเนนต์นี้

export default function Home() {
  return (
    <div className="pt-20">
      <h2 className="text-4xl font-bold text-green-800 mb-4 text-center">
        ยินดีต้อนรับสู่ IntroWeeD
      </h2>
      <p className="text-lg text-gray-700 mb-6 text-center">
        ร้านกัญชาออนไลน์คุณภาพ ส่งไว ปลอดภัย ถูกกฎหมาย
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}