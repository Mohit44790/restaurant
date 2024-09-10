import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="flex dark:bg-gray-800 dark:text-white  flex-col min-h-screen m-2 md:m-0">
      <header>
        <Navbar />
      </header>

      <div className="flex-1">
        <Outlet />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
