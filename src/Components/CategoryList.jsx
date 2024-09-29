import React, { useState } from "react";
import { categories } from "./data";
import ProductCard from "./ProductCard";
import CheckoutForm from "./CheckoutForm"; // Import form thanh toán

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]); // Quản lý trạng thái giỏ hàng
  const [showCheckout, setShowCheckout] = useState(false); // Hiển thị form thanh toán

  // Hàm thêm sản phẩm vào giỏ hàng
  const onAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Hàm tính tổng giá trị giỏ hàng
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity * parseFloat(item.price.replace(/[^\d]/g, "")),
      0
    );
  };

  // Hiển thị form thanh toán
  const handleCheckout = () => {
    setShowCheckout(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {selectedCategory ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Sản phẩm trong "{selectedCategory.name}"
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedCategory.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </>
        ) : (
          <p>Chọn một ngành hàng để xem sản phẩm</p>
        )}
      </div>

      {/* Hiển thị giỏ hàng */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Giỏ hàng</h2>
        {cart.length > 0 ? (
          <>
            <ul className="mt-4">
              {cart.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.name} - {item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-bold">Tổng giá trị: {calculateTotal()}đ</p>

            {/* Nút Thanh toán */}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleCheckout}
            >
              Thanh toán
            </button>

            {/* Hiển thị form thanh toán khi người dùng nhấn nút "Thanh toán" */}
            {showCheckout && (
              <CheckoutForm cart={cart} total={calculateTotal()} />
            )}
          </>
        ) : (
          <p>Giỏ hàng trống</p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
