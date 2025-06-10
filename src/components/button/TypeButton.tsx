import clsx from "clsx";
import { TravelPlanButton } from "../../types/button.type";

interface TypeButtonProps {
  buttonName: TravelPlanButton;
  isSelected: boolean;
  onClicked: React.Dispatch<React.SetStateAction<string>>;
}

const TypeButton = ({ buttonName, isSelected, onClicked }: TypeButtonProps) => {
  return (
    <button
      onClick={() => onClicked(buttonName)}
      className={clsx(
        "bg-common rounded-[4px] text-[12px] px-[10px] py-[4px] w-fit h-fit text-white hover:cursor-pointer hover:bg-selected",
        isSelected && "!bg-selected"
      )}
    >
      {buttonName}
    </button>
  );
};

export default TypeButton;
