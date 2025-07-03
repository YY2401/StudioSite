import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router";

const CartPage: React.FC = () => {
  const { items, removeFormCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">購物車</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">目前購物車沒有商品~</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p>
                  單價：${item.price} x {item.quantity}
                </p>
                <p>小計：${item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => removeFormCart(item.id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                刪除
              </button>
            </div>
          ))}
          <div className="text-right font-bold">總金額：${totalPrice}</div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              繼續購物
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              前往結帳
            </button>
          </div>

          <button
            onClick={clearCart}
            className="mt-4 text-sm text-red-500 hover:underline"
          >
            清空購物車
          </button>
        </div>
      )}
    </div>
  );
};
