import { useEffect } from "react";
import { LuIndianRupee } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useOrderStore } from "../store/useOrderStore";
import { CartItem } from "../types/cartType";

const Success = () => {
  // Example orders data (replace with actual order fetching logic)
  const { orders, getOrderDetails } = useOrderStore();

  // Fetch order details on component mount
  useEffect(() => {
    getOrderDetails();
  }, []);

  // If no orders are found, show a message
  if (orders.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Order Status: <span className="text-[#FF5A5A]">{"CONFIRM"}</span>
          </h1>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Order Summary
          </h2>

          {/* Display ordered items here */}
          {/* Assuming orders is an array of objects with a structure similar to this: */}
          {orders.map((order: any, index: number) => (
            <div key={index} className="mb-4">
              {order.cartItems.map((item: CartItem) => (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt="Ordered Item"
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                      {item.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-800 dark:text-gray-200 flex items-center">
                      <LuIndianRupee />
                      <span className="text-lg font-medium">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <Link to="/cart">
          <button className="bg-blue-500 hover:bg-blue-600 w-full py-3 rounded-md shadow-lg">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
