import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user || !user._id) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/user/${user._id}`
        );

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-center text-xl">No Orders Found</h2>
      ) : (
        <div className="max-w-5xl mx-auto flex flex-col gap-6">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow"
            >

              <p className="font-bold mb-4">
                Total: ₹ {order.totalPrice}
              </p>

              <div className="flex flex-col gap-4">

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-3"
                  >

                    {/* IMAGE */}
                    <img
                      src={
                        item?.productId?.image ||
                        "https://via.placeholder.com/80"
                      }
                      alt="product"
                      className="w-20 h-20 object-cover rounded"
                    />

                    {/* DETAILS */}
                    <div>
                      <h2 className="text-lg font-semibold">
                        {item?.productId?.name || "Product"}
                      </h2>

                      <p>Price: ₹ {item?.productId?.price || 0}</p>

                      <p>Qty: {item?.quantity}</p>
                    </div>

                  </div>
                ))}

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Orders;