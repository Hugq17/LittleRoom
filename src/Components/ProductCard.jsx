import React from "react";

const ProductCard = ({ product, onAddToCart }) => (
  <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden m-4">
    <img
      className="w-full h-48 object-cover"
      src={product.image}
      alt={product.name}
    />
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
      <p className="text-gray-600">{product.price}</p>
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => onAddToCart(product)}
      >
        Thêm vào giỏ hàng
      </button>
    </div>
  </div>
);

export default ProductCard;
