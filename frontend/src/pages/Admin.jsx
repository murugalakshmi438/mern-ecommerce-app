import axios from "axios";
import { useState } from "react";

const Admin = () => {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");



  const handleAddProduct = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://mern-backend-o98s.onrender.com/api/products/add",

        {
          title,
          price,
          image,
          stock,
          category
        },

        {
          headers: {
  Authorization: `Bearer ${token}`
}
        }
      );

      alert(res.data.message);

      setTitle("");
      setPrice("");
      setImage("");
      setStock("");
      setCategory("");

    } catch (error) {

      alert(error.response.data.message);

    }

  };



  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Admin Dashboard
        </h1>



        <div className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-4 rounded-lg"
          />



          <input
            type="number"
            placeholder="Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-4 rounded-lg"
          />



          <input
            type="text"
            placeholder="Product Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-4 rounded-lg"
          />



          <input
            type="number"
            placeholder="Stock Quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border p-4 rounded-lg"
          />



          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-4 rounded-lg"
          />



          <button
            onClick={handleAddProduct}
            className="bg-black text-white p-4 rounded-lg hover:bg-gray-800"
          >
            Add Product
          </button>

        </div>

      </div>

    </div>
  );
};

export default Admin;