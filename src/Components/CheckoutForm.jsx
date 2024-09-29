import React, { useState } from "react";
import emailjs from "emailjs-com";

const CheckoutForm = ({ cart, total }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Hàm xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Định dạng dữ liệu cần gửi qua email
    const orderDetails = {
      name,
      email,
      address,
      cart: cart
        .map((item) => `${item.name} - ${item.price} x ${item.quantity}`)
        .join(", "),
      total,
    };

    // Gửi email qua EmailJS
    sendOrderEmail(orderDetails);
  };

  // Hàm gửi email qua EmailJS
  const sendOrderEmail = (orderDetails) => {
    const serviceID = "service_hnvdhdn";
    const templateID = "template_zaczbze";
    const userID = "rNJvxmZz_qOTzmIzL";

    emailjs
      .send(
        serviceID,
        templateID,
        {
          name: orderDetails.name,
          email: orderDetails.email,
          address: orderDetails.address,
          cart: orderDetails.cart,
          total: orderDetails.total,
        },
        userID
      )
      .then((response) => {
        console.log("Email gửi thành công!", response.status, response.text);
        setMessage("Đơn hàng của bạn đã được gửi thành công!");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi gửi email: ", err);
        setMessage("Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại.");
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3 className="text-xl font-bold mb-4">Thông tin khách hàng</h3>

      {/* Trường nhập tên */}
      <div className="mb-4">
        <label className="block text-gray-700">Tên</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      {/* Trường nhập email */}
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      {/* Trường nhập địa chỉ */}
      <div className="mb-4">
        <label className="block text-gray-700">Địa chỉ</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        ></textarea>
      </div>

      {/* Nút gửi đơn hàng */}
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        disabled={loading} // Vô hiệu hóa khi đang gửi email
      >
        {loading ? "Đang gửi..." : "Gửi đơn hàng"}
      </button>

      {/* Thông báo trạng thái gửi */}
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </form>
  );
};

export default CheckoutForm;
