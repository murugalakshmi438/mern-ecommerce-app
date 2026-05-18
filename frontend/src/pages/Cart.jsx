import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-10">
        My Cart
      </h1>

      {cart.length === 0 ? (
        <h1 className="text-3xl text-center">Cart is Empty</h1>
      ) : (
        <div className="max-w-6xl mx-auto flex flex-col gap-6">

          {cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="bg-white p-8 rounded-2xl shadow-lg mt-6">
            <h1 className="text-3xl font-bold mb-4">
              Total: ₹ {totalPrice}
            </h1>

            <button
              onClick={() => navigate("/address")}
              className="bg-black text-white px-8 py-4 rounded-lg"
            >
              Proceed To Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;