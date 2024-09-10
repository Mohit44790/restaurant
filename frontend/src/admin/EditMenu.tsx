import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { MenuFormSchema, menuSchema } from "../schema/menuSchema";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { BiLoader } from "react-icons/bi";
import { useMenuStore } from "../store/useMenuStore";
import { MenuItem } from "../types/restaurantType";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuItem;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [error, setError] = useState<Partial<MenuFormSchema>>({});
  const { loading, editMenu } = useMenuStore();

  useEffect(() => {
    if (selectedMenu) {
      setInput({
        name: selectedMenu?.name || "",
        description: selectedMenu?.description || "",
        price: selectedMenu?.price || 0,
        image: undefined,
      });
    }
  }, [selectedMenu]);

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({
      ...input,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<MenuFormSchema>);
      return;
    }

    // Handle the API call here to update the menu item
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }
      // Uncomment when the API call is ready
      await editMenu(selectedMenu._id, formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
      <DialogContent>
        <div>
          <DialogTitle>Edit Menu</DialogTitle>
          <div>Update your menu to keep your offerings fresh and exciting!</div>
        </div>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter menu name"
            />
            {error.name && (
              <span className="text-xs font-medium text-red-600">
                {error.name}
              </span>
            )}
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter menu description"
            />
            {error.description && (
              <span className="text-xs font-medium text-red-600">
                {error.description}
              </span>
            )}
          </div>
          <div>
            <label>Price (Rupees)</label>
            <input
              type="number"
              name="price"
              value={input.price}
              onChange={changeEventHandler}
              placeholder="Enter menu price"
            />
            {error.price && (
              <span className="text-xs font-medium text-red-600">
                {error.price}
              </span>
            )}
          </div>
          <div>
            <label>Upload Menu Image</label>
            <input
              type="file"
              name="image"
              onChange={(e) =>
                setInput({ ...input, image: e.target.files?.[0] || undefined })
              }
            />
            {error.image && (
              <span className="text-xs font-medium text-red-600">
                {error.image.name}
              </span>
            )}
          </div>
          <footer className="mt-5">
            {loading ? (
              <button disabled className="bg-orange hover:bg-hoverOrange">
                <BiLoader className="mr-2 w-4 h-4 animate-spin" />
                Please wait
              </button>
            ) : (
              <button className="bg-orange hover:bg-hoverOrange">Submit</button>
            )}
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
