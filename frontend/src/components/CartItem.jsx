import { useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { setCart } = useContext(CartContext);

  const removeFromCart = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // update UI instantly
      setCart((prev) =>
        prev.filter((cartItem) => cartItem._id !== id)
      );
    } catch (error) {
      console.log("Remove error:", error);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow">

      {/* Product Info */}
      <div>
        <h2 className="text-xl font-semibold">
          {item.productId?.name}
        </h2>

        <p className="text-gray-600">
          ₹ {item.productId?.price}
        </p>

        <p className="text-sm text-gray-500">
          Qty: {item.quantity}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item._id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Remove
      </button>

    </div>
  );
};

export default CartItem;