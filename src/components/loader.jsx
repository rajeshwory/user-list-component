import { LoaderCircle } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircle size={100} color="#C0C2C9" className="animate-spin"/>
    </div>

  );
};

export default Loader;
