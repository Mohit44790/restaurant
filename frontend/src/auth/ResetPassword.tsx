import { useState } from "react";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate a password reset process (e.g., call an API)
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg shadow-lg bg-white p-8"
      >
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
          <p className="text-sm text-gray-400">Enter Your Password </p>
        </div>

        <div className="relative">
          <MdPassword className="absolute inset-y-2 left-3 text-gray-400 pointer-events-none text-2xl" />
          <input
            type="password"
            name="password"
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter Your Email"
            className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Reset
        </button>
        <span>
          Back To
          <Link className="text-blue-500" to={"/login"}>
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
