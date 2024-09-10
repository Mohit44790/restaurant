import { FormEvent, useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import {
  RestaurantFormSchema,
  restaurantFromSchema,
} from "../schema/restaurantSchema";
import { useRestaurantStore } from "../store/useRestaurantStore";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });
  const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({});
  const {
    loading,
    restaurant,
    updateRestaurant,
    createRestaurant,
    getRestaurant,
  } = useRestaurantStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurantFromSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RestaurantFormSchema>);
      return;
    }
    // add restaurant api implementation start from here
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.imageFile) {
        formData.append("imageFile", input.imageFile);
      }

      if (restaurant) {
        // update
        await updateRestaurant(formData);
      } else {
        // create
        await createRestaurant(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      if (restaurant) {
        setInput({
          restaurantName: restaurant.restaurantName || "",
          city: restaurant.city || "",
          country: restaurant.country || "",
          deliveryTime: restaurant.deliveryTime || 0,
          cuisines: restaurant.cuisines
            ? restaurant.cuisines.map((cuisine: string) => cuisine)
            : [],
          imageFile: undefined,
        });
      }
    };
    fetchRestaurant();
    console.log(restaurant);
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
      <form onSubmit={submitHandler}>
        <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
          {/* Restaurant Name */}
          <div>
            <label>Restaurant Name</label>
            <input
              type="text"
              name="restaurantName"
              value={input.restaurantName}
              onChange={changeEventHandler}
              placeholder="Enter your restaurant name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {errors.restaurantName && (
              <span className="text-xs text-red-600 font-medium">
                {errors.restaurantName}
              </span>
            )}
          </div>

          {/* City */}
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
              placeholder="Enter your city name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {errors.city && (
              <span className="text-xs text-red-600 font-medium">
                {errors.city}
              </span>
            )}
          </div>

          {/* Country */}
          <div>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
              placeholder="Enter your country name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {errors.country && (
              <span className="text-xs text-red-600 font-medium">
                {errors.country}
              </span>
            )}
          </div>

          {/* Delivery Time */}
          <div>
            <label>Delivery Time (minutes)</label>
            <input
              type="number"
              name="deliveryTime"
              value={input.deliveryTime}
              onChange={changeEventHandler}
              placeholder="Enter your delivery time (in minutes)"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {errors.deliveryTime && (
              <span className="text-xs text-red-600 font-medium">
                {errors.deliveryTime}
              </span>
            )}
          </div>

          {/* Cuisines */}
          <div>
            <label>Cuisines</label>
            <input
              type="text"
              name="cuisines"
              value={input.cuisines.join(",")}
              onChange={(e) =>
                setInput({ ...input, cuisines: e.target.value.split(",") })
              }
              placeholder="e.g. Momos, Biryani"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {errors.cuisines && (
              <span className="text-xs text-red-600 font-medium">
                {errors.cuisines}
              </span>
            )}
          </div>

          {/* Upload Restaurant Banner */}
          <div>
            <label>Upload Restaurant Banner</label>
            <input
              type="file"
              accept="image/*"
              name="imageFile"
              onChange={(e) =>
                setInput({
                  ...input,
                  imageFile: e.target.files?.[0] || undefined,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {errors.imageFile && (
              <span className="text-xs text-red-600 font-medium">
                {errors.imageFile?.name || "Images is Required"}
              </span>
            )}
          </div>
        </div>

        <div className="my-5 w-fit">
          {loading ? (
            <button
              disabled
              className="bg-orange-500 text-white py-2 px-4 rounded flex items-center justify-center"
            >
              <BiLoader className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              {restaurant ? "Update Your Restaurant" : "Add Your Restaurant"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Restaurant;
