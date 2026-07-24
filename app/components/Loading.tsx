import { LoaderIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-96 h-full w-full flex-center">
      <LoaderIcon className="animate-spin size-8 text-green-950" />
    </div>
  );
};

export default Loading;
