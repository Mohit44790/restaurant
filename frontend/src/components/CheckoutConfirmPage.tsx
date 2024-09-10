import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { BiLoader } from "react-icons/bi";
import { useCartStore } from "../store/useCartStore";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { useOrderStore } from "../store/useOrderStore";
import { useUserStore } from "../store/useUserStore";
import { CheckoutSessionRequest } from "../types/orderType";

const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();
  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });
  const { cart } = useCartStore();
  const { restaurant } = useRestaurantStore();
  const { createCheckoutSession, loading } = useOrderStore();
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const checkoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // api implementation start from here
    try {
      const checkoutData: CheckoutSessionRequest = {
        cartItems: cart.map((cartItem) => ({
          menuId: cartItem._id,
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price.toString(),
          quantity: cartItem.quantity.toString(),
        })),
        deliveryDetails: input,
        restaurantId: restaurant?._id as string,
      };
      await createCheckoutSession(checkoutData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <DialogTitle className="font-semibold">Review Your Order</DialogTitle>
        <div className="text-xs">
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit the confirm button to finalize your order.
        </div>
        <form
          onSubmit={checkoutHandler}
          className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0 mt-4"
        >
          <div>
            <label>Fullname</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              disabled
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={input.address}
              onChange={changeEventHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <footer className="col-span-2 pt-5">
            {loading ? (
              <button
                disabled
                className="bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center"
              >
                <BiLoader className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </button>
            ) : (
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
              >
                Continue To Payment
              </button>
            )}
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;
