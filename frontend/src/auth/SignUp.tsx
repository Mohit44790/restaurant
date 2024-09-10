import { ChangeEvent, FormEvent, useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaUser } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { SignupInputState, userSignupSchema } from "../schema/userSchema";
import { useUserStore } from "../store/useUserStore";

const SignUp = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const signupSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    // form validation check start
    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }
    // signup API implementation start here
    try {
      await signup(input);
      // navigate("/verify-email");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={signupSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border bg-white p-6"
      >
        <h1 className="mb-4 text-2xl font-bold">Create Account</h1>
        <div className="mb-4">
          <label className="sr-only" htmlFor="fullname">
            Full Name
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <FaUser className="text-xl mr-2" />
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Full Name"
              className="w-full p-2 outline-none"
              required
            />
          </div>
          {errors.fullname && (
            <span className="text-sm text-red-500">{errors.fullname}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <MdEmail className="text-xl mr-2" />
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Email"
              className="w-full p-2 outline-none"
              required
            />
          </div>
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
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
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Password"
              className="w-full p-2 outline-none"
              required
            />
          </div>
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="sr-only" htmlFor="contact">
            Contact
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <FaPhoneVolume className="text-xl mr-2" />
            <input
              type="text"
              id="contact"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              placeholder="Contact"
              className="w-full p-2 outline-none"
              required
            />
          </div>
          {errors.contact && (
            <span className="text-sm text-red-500">{errors.contact}</span>
          )}
        </div>
        <div className="flex justify-center">
          {loading ? (
            <ClipLoader color="#36d7b7" loading={loading} size={30} />
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          )}
        </div>
        <p className="mt-4">
          Already have an Account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
