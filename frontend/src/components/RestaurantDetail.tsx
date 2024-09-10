import { Badge } from "@mui/material";
import { useEffect } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { useParams } from "react-router-dom";
import AvailableMenu from "./AvailableMenu";
import { useRestaurantStore } from "../store/useRestaurantStore";

const RestaurantDetail = () => {
  const params = useParams();
  const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();

  useEffect(() => {
    getSingleRestaurant(params.id!);
  }, [params.id]);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src={singleRestaurant?.imageUrl || "Loading..."}
            alt="res_image"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">
              {singleRestaurant?.restaurantName || "Loading..."}
            </h1>
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-lg bg-black text-white cursor-pointer hover:bg-gray-700 transition-colors duration-200">
              {singleRestaurant?.cuisines.map(
                (cuisine: string, idx: number) => (
                  <Badge key={idx}>{cuisine}</Badge>
                )
              )}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <MdOutlineTimer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time:{" "}
                  <span className="text-[#D19254]">
                    {singleRestaurant?.deliveryTime || "NA"} mins
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        {singleRestaurant?.menus && (
          <AvailableMenu menus={singleRestaurant?.menus!} />
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;
