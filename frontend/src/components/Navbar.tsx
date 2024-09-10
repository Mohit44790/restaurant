import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { BiLoader, BiMenu, BiMoon, BiSun } from "react-icons/bi";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  const { cart } = useCartStore();
  const [showDashboardDropdown, setShowDashboardDropdown] = useState(false);
  const { theme, setTheme } = useThemeStore(); // Access theme and setTheme

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="max-w-7xl dark:bg-gray-800 dark:text-white  mx-auto">
      <div className="flex items-center justify-between h-14 px-4">
        <Link to="/">
          <h1 className="font-bold md:font-extrabold text-2xl">
            MKRestaurants
          </h1>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/order/status">Order</Link>

            {user?.admin && (
              <div className="relative">
                <button
                  onClick={() =>
                    setShowDashboardDropdown(!showDashboardDropdown)
                  }
                  className="font-semibold"
                >
                  Dashboard
                </button>
                {showDashboardDropdown && (
                  <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg p-4">
                    <Link to="/admin/restaurant" className="block mb-2">
                      Restaurant
                    </Link>
                    <Link to="/admin/menu" className="block mb-2">
                      Menu
                    </Link>
                    <Link to="/admin/orders" className="block">
                      Orders
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme}>
              {theme === "dark" ? (
                <BiMoon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <BiSun className="h-[1.2rem] w-[1.2rem]" />
              )}
            </button>

            <Link to="/cart" className="relative cursor-pointer">
              <FaShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 text-xs rounded-full w-4 h-4 bg-red-500 text-white flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            <div>
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="profilephoto"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 text-gray-500" />
              )}
            </div>
            <div>
              {loading ? (
                <button className="bg-orange hover:bg-hoverOrange flex items-center px-2 py-1 rounded">
                  <BiLoader className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="bg-orange hover:bg-hoverOrange px-4 py-2 rounded"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const { user, logout, loading } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useThemeStore();

  // Toggle theme for mobile
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-gray-200 text-black hover:bg-gray-300 p-2"
      >
        <BiMenu size={24} />
      </button>
      {isOpen && (
        <div className="absolute top-16 right-0 w-48 flex flex-col mt-2 bg-white shadow-lg rounded-lg p-4">
          <Link to="/profile" className="mb-2">
            Profile
          </Link>
          <Link to="/order/status" className="mb-2">
            Order
          </Link>
          <Link to="/cart" className="mb-2">
            Cart
          </Link>
          {user?.admin && (
            <>
              <Link to="/admin/menu" className="mb-2">
                Menu
              </Link>
              <Link to="/admin/restaurant" className="mb-2">
                Restaurant
              </Link>
              <Link to="/admin/orders" className="mb-2">
                Orders
              </Link>
            </>
          )}
          <div className="flex items-center mt-4">
            <button onClick={toggleTheme} className="mr-2">
              {theme === "dark" ? <BiSun /> : <BiMoon />}
            </button>
          </div>
          <div className="mt-4">
            {loading ? (
              <button className="bg-orange hover:bg-hoverOrange flex items-center px-4 py-2 rounded">
                <BiLoader className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </button>
            ) : (
              <button
                onClick={logout}
                className="bg-orange hover:bg-hoverOrange px-4 py-2 rounded"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
