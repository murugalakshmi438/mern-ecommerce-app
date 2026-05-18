import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold text-green-400">
        Order Placed Successfully 🎉
      </h1>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate("/orders")}
          className="bg-orange-500 px-5 py-2 rounded"
        >
          View Orders
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-white text-black px-5 py-2 rounded"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Success;