import { FormEvent, useState } from "react";
import { MenuFormSchema, menuSchema } from "../schema/menuSchema";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { BiLoader, BiPlus } from "react-icons/bi";
import EditMenu from "./EditMenu";
import { useMenuStore } from "../store/useMenuStore";
import { useRestaurantStore } from "../store/useRestaurantStore";

const AddMenu = () => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [error, setError] = useState<Partial<MenuFormSchema>>({});
  const { loading, createMenu } = useMenuStore();
  // Dummy loading and restaurant for now

  const { restaurant } = useRestaurantStore(); // Replace this with actual data fetching

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<MenuFormSchema>);
      return;
    }
    // API call to create menu
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }
      await createMenu(formData); // Uncomment and add API function here
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between items-center">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menus
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center py-2 px-4 rounded"
          onClick={() => setOpen(true)}
        >
          <BiPlus className="mr-2" />
          Add Menu
        </button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add A New Menu</DialogTitle>
        <DialogContent>
          <div>Create a menu that will make your restaurant stand out.</div>
          <form onSubmit={submitHandler} className="space-y-4">
            {/* Name */}
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter menu name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {error?.name && (
                <span className="text-xs font-medium text-red-600">
                  {error.name}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter menu description"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {error?.description && (
                <span className="text-xs font-medium text-red-600">
                  {error.description}
                </span>
              )}
            </div>

            {/* Price */}
            <div>
              <label>Price (Rupees)</label>
              <input
                type="number"
                name="price"
                value={input.price}
                onChange={changeEventHandler}
                placeholder="Enter menu price"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {error?.price && (
                <span className="text-xs font-medium text-red-600">
                  {error.price}
                </span>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label>Upload Menu Image</label>
              <input
                type="file"
                name="image"
                onChange={(e) =>
                  setInput({
                    ...input,
                    image: e.target.files?.[0] || undefined,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
              {error?.image?.name && (
                <span className="text-xs font-medium text-red-600">
                  {error.image?.name}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <footer className="mt-5">
              {loading ? (
                <button
                  disabled
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
                >
                  <BiLoader className="mr-2 w-4 h-4 animate-spin" />
                  Please wait
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              )}
            </footer>
          </form>
        </DialogContent>
      </Dialog>

      {/* List of Menus */}
      {restaurant?.menus?.map((menu: any, idx: number) => (
        <div key={idx} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={menu.image}
              alt={menu.name}
              className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {menu.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-[#D19254]">{menu.price}</span>
              </h2>
            </div>
            <button
              onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2"
            >
              Edit
            </button>
          </div>
        </div>
      ))}

      {/* Edit Menu Dialog */}
      {/* You can add the EditMenu component and logic here */}
      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
