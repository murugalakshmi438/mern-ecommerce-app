import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = ({ search }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ FILTER OUTSIDE FETCH (correct place)
  const filteredProducts = products.filter((p) =>
    p?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-10">
        Latest Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

      </div>

    </div>
  );
};

export default Home;