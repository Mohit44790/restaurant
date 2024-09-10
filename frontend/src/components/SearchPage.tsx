import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { useEffect, useState } from "react";

import { AspectRatio } from "react-aspect-ratio";
import Card from "@mui/material/Card";
import { Badge, CardContent } from "@mui/material";
import { FaGlobe, FaMap } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { Restaurant } from "../types/restaurantType";
import { FaX } from "react-icons/fa6";

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    loading,
    searchedRestaurant,
    searchRestaurant,
    setAppliedFilter,
    appliedFilter,
  } = useRestaurantStore();

  useEffect(() => {
    searchRestaurant(params.text!, searchQuery, appliedFilter);
  }, [params.text!, appliedFilter]);
  return (
    <div className="max-w-7xl  mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by restaurant & cuisines"
              className="p-2 border rounded-md w-full"
            />
            <button
              onClick={() =>
                searchRestaurant(params.text!, searchQuery, appliedFilter)
              }
              className="bg-blue-500 hover:bg-blue-600 p-2 text-white rounded-md"
            >
              Search
            </button>
          </div>

          {/* Search Results */}
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">
                ({searchedRestaurant?.data.length}) Search result found
              </h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {appliedFilter.map((selectedFilter: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative inline-flex items-center max-w-full"
                  >
                    <Badge className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap">
                      {selectedFilter}
                    </Badge>
                    <FaX
                      onClick={() => setAppliedFilter(selectedFilter)}
                      size={16}
                      className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurant Card */}
            <div className="grid md:grid-cols-3 gap-4">
              {loading ? (
                <SearchPageSkeleton />
              ) : !loading && searchedRestaurant?.data.length === 0 ? (
                <NoResultFound searchText={params.text!} />
              ) : (
                searchedRestaurant?.data.map((restaurant: Restaurant) => (
                  <Card
                    key={restaurant._id}
                    className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="relative">
                      <AspectRatio ratio={16 / 6}>
                        <img
                          src={restaurant.imageUrl}
                          alt="Restaurant"
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Feature
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {restaurant.restaurantName}
                      </h1>
                      <div className="mt-2 gap-2 flex items-center text-gray-600 dark:text-gray-400">
                        <FaMap className="" size={16} />
                        <p className="text-sm">
                          City:{" "}
                          <span className="font-medium">{restaurant.city}</span>
                        </p>
                      </div>
                      <div className="mt-2 gap-2 flex items-center text-gray-600 dark:text-gray-400">
                        <FaGlobe className="" size={16} />
                        <p className="text-sm">
                          Country:{" "}
                          <span className="font-medium">
                            {restaurant.country}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {restaurant.cuisines.map(
                          (cuisine: string, idx: number) => (
                            <Badge
                              key={idx}
                              className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-lg bg-black text-white cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                            >
                              {cuisine}
                            </Badge>
                          )
                        )}
                      </div>
                    </CardContent>
                    <div className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 flex justify-end">
                      <Link to={`/restaurant/${restaurant._id}`}>
                        <button className="bg-blue-500 hover:bg-orange-600 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                          View Menus
                        </button>
                      </Link>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

export const SearchPageSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden"
        >
          <div className="relative">
            <AspectRatio ratio={16 / 6}>
              <Skeleton className="w-full h-full" />
            </AspectRatio>
          </div>
          <CardContent className="p-4">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardContent>
          <div className="p-4 dark:bg-gray-900 flex justify-end">
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
        </Card>
      ))}
    </>
  );
};

export const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for "{searchText}". <br /> Try searching
        with a different term.
      </p>
      <Link to="/">
        <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md">
          Go Back to Home
        </button>
      </Link>
    </div>
  );
};
