import axios from "axios";
import { useContext } from "react";

import {
  CartContext
} from "../context/CartContext";

const ProductCard = ({ product }) => {

  const {
    fetchCart
  } = useContext(CartContext);




  const addToCart = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/cart/add",
      {
        productId: product._id,
        quantity: 1
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // 🔥 FIXED
        }
      }
    );

    console.log("Added to cart:", res.data);

    // 🔥 refresh cart UI
    fetchCart();

  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};




  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 duration-300">

      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover"
      />



      <div className="p-5">

        <h1 className="text-2xl font-bold mb-2">
          {product.title}
        </h1>



        <p className="text-gray-600 mb-2">
          Category: {product.category}
        </p>



        <p className="text-2xl font-bold text-green-600 mb-4">
          ₹ {product.price}
        </p>



        <button
          onClick={addToCart}
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800"
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
};

export default ProductCard;