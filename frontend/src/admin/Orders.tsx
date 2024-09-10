import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useEffect } from "react";
import { useRestaurantStore } from "../store/useRestaurantStore";

const Orders = () => {
  const { restaurantOrder, getRestaurantOrders, updateRestaurantOrder } =
    useRestaurantStore();

  const handleStatusChange = async (id: string, status: string) => {
    await updateRestaurantOrder(id, status);
  };
  useEffect(() => {
    getRestaurantOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
        Orders Overview
      </h1>
      <div className="space-y-8">
        {/* Display the restaurant orders */}
        {restaurantOrder.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex-1 mb-6 sm:mb-0">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {order.deliveryDetails.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Address: </span>
                {order.deliveryDetails.address}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Total Amount: </span>₹
                {order.totalAmount / 100}
              </p>
            </div>
            <div className="w-full sm:w-1/3">
              <FormControl fullWidth>
                <InputLabel id={`order-status-label-${order._id}`}>
                  Order Status
                </InputLabel>
                <Select
                  labelId={`order-status-label-${order._id}`}
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value as string)
                  }
                  defaultValue={order.status}
                >
                  {[
                    "Pending",
                    "Confirmed",
                    "Preparing",
                    "OutForDelivery",
                    "Delivered",
                  ].map((status: string, index: number) => (
                    <MenuItem key={index} value={status.toLowerCase()}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
