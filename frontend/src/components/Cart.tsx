import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useCartStore } from "../store/useCartStore";
import { CartItem } from "../types/cartType";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { cart, decrementQuantity, incrementQuantity } = useCartStore();

  let totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  }, 0);
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <button className="text-red-500 hover:text-red-700">Clear All</button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Items</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
            <TableCell className="text-right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((item: CartItem) => (
            <TableRow>
              <TableCell>
                <img
                  src={item.image}
                  alt="img"
                  className="w-16 h-16 object-cover"
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell> {item.price}</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-300 dark:border-gray-700 shadow-md p-1">
                  <button
                    onClick={() => decrementQuantity(item._id)}
                    className="rounded-full bg-gray-200 p-2"
                  >
                    <BiMinus />
                  </button>
                  <span className="font-bold mx-3"> {item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item._id)}
                    className="rounded-full bg-orange-500 hover:bg-orange-600 p-2"
                  >
                    <BiPlus />
                  </button>
                </div>
              </TableCell>
              <TableCell>{item.price * item.quantity}</TableCell>
              <TableCell className="text-right">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Remove
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">{totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <button
          onClick={() => setOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
        >
          Proceed To Checkout
        </button>
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
