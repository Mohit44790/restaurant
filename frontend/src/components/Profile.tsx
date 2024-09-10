import { FormEvent, useRef, useState } from "react";
import { BiLoader, BiPlus } from "react-icons/bi";
import {
  FaMapMarkerAlt,
  FaMapMarker,
  FaMapPin,
  FaUserCircle,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useUserStore } from "../store/useUserStore";

const Profile = () => {
  const { user, updateProfile } = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    profilePicture: user?.profilePicture || "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>(
    profileData.profilePicture || ""
  );

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateProfile(profileData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={updateProfileHandler}
      className="max-w-7xl dark:bg-gray-700 dark:border-white mx-auto my-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative md:w-28 md:h-28 w-20 h-20">
            {selectedProfilePicture ? (
              <img
                src={selectedProfilePicture}
                alt="Profile"
                className="rounded-full w-full h-full  object-cover"
              />
            ) : (
              <FaUserCircle className="w-full h-full text-gray-500 dark:text-gray-300" />
            )}
            <input
              ref={imageRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <BiPlus className="text-white w-8 h-8" />
            </div>
          </div>
          <input
            type="text"
            name="fullname"
            value={profileData.fullname}
            onChange={changeHandler}
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent bg-transparent dark:text-gray-100"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 dark:bg-gray-700">
          <MdEmail className="text-gray-500 dark:text-gray-300" />
          <div className="w-full">
            <label className="dark:text-gray-300">Email</label>
            <input
              disabled
              name="email"
              value={profileData.email}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent dark:text-gray-300 focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 dark:bg-gray-700">
          <FaMapMarkerAlt className="text-gray-500 dark:text-gray-300" />
          <div className="w-full">
            <label className="dark:text-gray-300">Address</label>
            <input
              name="address"
              value={profileData.address}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent dark:text-gray-300 focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 dark:bg-gray-700">
          <FaMapMarker className="text-gray-500 dark:text-gray-300" />
          <div className="w-full">
            <label className="dark:text-gray-300">City</label>
            <input
              name="city"
              value={profileData.city}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent dark:text-gray-300 focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 dark:bg-gray-700">
          <FaMapPin className="text-gray-500 dark:text-gray-300" />
          <div className="w-full">
            <label className="dark:text-gray-300">Country</label>
            <input
              name="country"
              value={profileData.country}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent dark:text-gray-300 focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        {isLoading ? (
          <button
            disabled
            className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <BiLoader className="mr-2 w-4 h-4 animate-spin inline-block" />
            Please wait
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Update Profile
          </button>
        )}
      </div>
    </form>
  );
};

export default Profile;
