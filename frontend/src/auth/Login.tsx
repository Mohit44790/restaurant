import { ChangeEvent, FormEvent, useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { LoginInputState, userLoginSchema } from "../schema/userSchema";
import { useUserStore } from "../store/useUserStore";

// TypeScript type for login state
// type LoginInputState = {
//   email: string;
//   password: string;
// };

const Login = () => {
  const { loading, login } = useUserStore();
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
  const navigate = useNavigate();

  // Event handler for input change
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    try {
      await login(input);
      // console.log(input);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="md:p-8 w-full max-w-md rounded-lg md:border border bg-white p-6"
      >
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        <div className="mb-4">
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <MdEmail className="text-xl mr-2" />
            <input
              type="email"
              id="email"
              name="email" // Add name attribute for the input
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Email"
              className="w-full p-2 outline-none"
              required
            />
            {errors && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <MdLock className="text-xl mr-2" />
            <input
              type="password"
              id="password"
              name="password" // Add name attribute for the input
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Password"
              className="w-full p-2 outline-none"
              required
            />
            {errors && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          {loading ? (
            <ClipLoader color="#36d7b7" loading={loading} size={30} />
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          )}
        </div>
        <Link to={"/forgot-password"} className="text-blue-500 mt-4">
          Forgot Password
        </Link>

        <p className="mt-4">
          Don't have an Account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
