import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ search, setSearch }) => {
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">

      {/* LEFT - LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        E-Commerce
      </h1>

      {/* CENTER - SEARCH BAR */}
      <div className="flex items-center w-[40%]">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-l-md text-white bg-gray-800 outline-none"
        />

        <button className="bg-orange-500 px-4 py-2 rounded-r-md">
          Search
        </button>

      </div>

      {/* RIGHT - LINKS */}
      <div className="flex gap-5 text-lg items-center">

        <Link to="/" className="hover:text-orange-400">
          Home
        </Link>

        <Link to="/cart" className="hover:text-orange-400">
          Cart
        </Link>

        {/* ⭐ VIEW ORDERS BUTTON */}
        <Link
          to="/orders"
          className="bg-orange-500 px-4 py-1 rounded text-white hover:bg-orange-600"
        >
          View Orders
        </Link>

        <Link to="/login" className="hover:text-orange-400">
          Login
        </Link>

        {isAdmin && (
          <Link to="/admin" className="text-red-400 hover:text-red-300">
            Admin
          </Link>
        )}

      </div>

    </nav>
  );
};

export default Navbar;