import clsx from "clsx";
import { useState } from "react";

interface TransferButtonProps {
  children: React.ReactNode;
}

const TransferButton = ({ children }: TransferButtonProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <button
      onClick={() => setIsClicked(!isClicked)}
      className={clsx(
        "bg-[#F1F1F1] rounded-[4px] w-[53px] h-[28px] place-content-center text-black/70 hover:cursor-pointer hover:bg-[#C3C3C3] hover:text-black text-[12px]",
        isClicked && "!bg-[#C3C3C3] text-black"
      )}
    >
      {children}
    </button>
  );
};

export default TransferButton;
