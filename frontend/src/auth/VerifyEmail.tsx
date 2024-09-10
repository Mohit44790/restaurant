import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const { loading, verifyEmail } = useUserStore();
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
    // Move to the next input field if a digit is entered
    if (value !== "" && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = otp.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="relative flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg shadow-lg bg-white p-8"
      >
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Verify Your Email</h1>
          <p className="text-sm text-gray-400">
            Enter the verification code sent to your email
          </p>
        </div>

        <div className="flex justify-center gap-2">
          {otp.map((letter: string, idx: number) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={letter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(idx, e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(idx, e)
              }
              ref={(el) => (inputRef.current[idx] = el!)}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          ))}
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
