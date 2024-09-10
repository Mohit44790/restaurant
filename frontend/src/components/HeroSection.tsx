import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-5 md:p-10 items-center justify-between gap-8">
      {/* Text Section */}
      <div className="flex flex-col gap-5 md:w-[40%]">
        <h1 className="font-bold text-4xl md:text-5xl">
          Order Food Anytime & Anywhere
        </h1>
        <p className="text-gray-500">
          Hey! Our delicious food is waiting for you. Just order and enjoy!
        </p>

        {/* Search Bar */}
        <div className="relative flex items-center w-full">
          <BiSearch className="absolute left-3 text-gray-500" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for your favorite food..."
            className="w-full pl-10 py-2 border-2 rounded-l-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => navigate(`/search/${searchText}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-500"
          >
            Search
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-[50%] ">
        <img
          src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
          alt="Delicious burger with melted cheese"
          className="object-cover  max-h-[500px] rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
