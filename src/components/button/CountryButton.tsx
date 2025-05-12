import clsx from "clsx";

interface CountryButtonProps {
  children: React.ReactNode;
  isSelected: boolean;
  clickedCountry: string;
  onClicked: React.Dispatch<React.SetStateAction<string>>;
}

const CountryButton = ({
  children,
  isSelected,
  clickedCountry,
  onClicked,
}: CountryButtonProps) => {
  return (
    <button
      onClick={() => onClicked(clickedCountry)}
      className={clsx(
        "rounded-[50px] bg-unselected text-white px-[15px] py-[7px] [box-shadow:2px_2px_7px_rgba(0,0,0,0.1)] text-[15px] hover:cursor-pointer hover:bg-selected",
        isSelected && "!bg-selected"
      )}
    >
      {children}
    </button>
  );
};

export default CountryButton;
