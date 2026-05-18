import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Payment = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  const handlePayment = async () => {
    try {
      console.log("🔥 Payment clicked");

      const token = localStorage.getItem("token");

      // ✅ FIXED USER PARSE (IMPORTANT)
      const user = JSON.parse(localStorage.getItem("user") || "null");

      // ❌ USER CHECK (FIXED)
      if (!user || !user._id) {
        console.log("❌ No user found");
        alert("Please login again");
        return;
      }

      // ❌ CART CHECK
      if (!cart || cart.length === 0) {
        console.log("❌ Cart is empty");
        alert("Cart is empty");
        return;
      }

      // 💰 SAFE TOTAL PRICE CALCULATION
      const totalPrice = cart.reduce((sum, item) => {
        const price =
          item?.productId?.price ||
          item?.price ||
          0;

        const qty = item?.quantity || 1;

        return sum + price * qty;
      }, 0);

      console.log("💰 Total Price:", totalPrice);

      // 📦 CREATE ORDER
      const orderResponse = await axios.post(
        "http://localhost:5000/api/orders",
        {
          userId: user._id,
          items: cart,
          totalPrice,
        }
      );

      console.log("📦 Order created:", orderResponse.data);

      // 🧹 CLEAR BACKEND CART (SAFE)
      try {
        await axios.delete("http://localhost:5000/api/cart/clear", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.log("⚠️ Cart clear failed (ignored)");
      }

      // 🧹 CLEAR FRONTEND CART
      setCart([]);

      // 🧽 REMOVE ADDRESS
      localStorage.removeItem("address");

      console.log("🚀 Navigating to success page");

      // 🎉 SUCCESS PAGE
      navigate("/success");

    } catch (error) {
      console.log("❌ Payment Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-xl">

        <h1 className="text-4xl font-bold text-center mb-8">
          Payment Page
        </h1>

        <div className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Card Holder Name"
            className="border p-4 rounded-lg"
          />

          <input
            type="number"
            placeholder="Card Number"
            className="border p-4 rounded-lg"
          />

          <div className="flex gap-5">
            <input
              type="text"
              placeholder="MM/YY"
              className="border p-4 rounded-lg w-full"
            />
            <input
              type="number"
              placeholder="CVV"
              className="border p-4 rounded-lg w-full"
            />
          </div>

          <button
            onClick={handlePayment}
            className="bg-black text-white p-4 rounded-lg hover:bg-gray-800"
          >
            Pay Now
          </button>

        </div>

      </div>
    </div>
  );
};

export default Payment;