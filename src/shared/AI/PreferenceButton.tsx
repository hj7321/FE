import clsx from "clsx";
import { useState } from "react";

interface PreferenceButtonProps {
  children: React.ReactNode;
}

const PreferenceButton = ({ children }: PreferenceButtonProps) => {
  const [isClickedPreference, setIsClickedPreference] = useState<
    boolean | null
  >(null);

  return (
    <div className="flex text-[12px] h-[25px] text-black/70">
      <div className="bg-[#F1F1F1] w-[100px] place-content-center text-left pl-[10px] rounded-l-[4px] text-black">
        {children}
      </div>
      <button
        onClick={() => setIsClickedPreference(true)}
        className={clsx(
          "bg-[#DFDFDF] w-[100px] place-content-center border-r border-[#C8C8C8] hover:cursor-pointer hover:bg-[#A3DDB8] hover:text-black",
          isClickedPreference == true && "!bg-[#A3DDB8] text-black"
        )}
      >
        선호
      </button>
      <button
        onClick={() => setIsClickedPreference(false)}
        className={clsx(
          "bg-[#DFDFDF] w-[100px] rounded-r-[4px] place-content-center hover:cursor-pointer hover:bg-[#DEA3A3] hover:text-black",
          isClickedPreference == false && "!bg-[#DEA3A3] text-black"
        )}
      >
        비선호
      </button>
    </div>
  );
};

export default PreferenceButton;
