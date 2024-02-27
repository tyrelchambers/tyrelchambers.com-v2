import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  return (
    <a href="/" className="flex gap-4 items-center hover:text-orange-500 mb-10">
      <ArrowLeft size={20} />
      <p>Back</p>
    </a>
  );
};

export default BackButton;
