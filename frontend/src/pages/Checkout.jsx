import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const totalPrice = cart.reduce(
        (sum, item) =>
          sum + item.productId.price * item.quantity,
        0
      );

      await axios.post("https://mern-backend-o98s.onrender.com/api/orders", {
        userId: user._id,
        items: cart,
        totalPrice,
      });

      setCart([]);
      navigate("/success");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Checkout</h1>

      <button
        onClick={handlePlaceOrder}
        className="bg-orange-500 px-6 py-3 rounded"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;