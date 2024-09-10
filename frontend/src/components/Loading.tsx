import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <ScaleLoader color="white" height={40} width={8} />
    </div>
  );
};

export default Loading;
