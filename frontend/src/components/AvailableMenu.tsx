import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { MenuItem } from "../types/restaurantType";

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-center md:text-left">
        Available Menus
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menus.map((menu: MenuItem) => (
          <Card className="shadow-lg rounded-lg overflow-hidden">
            <img
              src={menu.image}
              alt="image"
              className="w-full h-40 object-cover"
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {menu.description}
              </p>
              <h3 className="text-lg font-semibold mt-4">
                Price: <span className="text-[#D19254]">₹{menu.price}</span>
              </h3>
            </CardContent>
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800">
              <button
                onClick={() => {
                  addToCart(menu);
                  navigate("/cart");
                }}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;
