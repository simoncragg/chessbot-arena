import { TbLoader2 } from "react-icons/tb";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-row rounded-md border border-white px-4 py-2 gap-2 items-center justify-between">
      <span className="text-base font-semibold">Loading bots ...</span>
      <TbLoader2 className="w-6 h-6 text-white rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
