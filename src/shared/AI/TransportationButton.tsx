import clsx from "clsx";
import { useOptionalSurveyStore } from "../../stores/optionalSurvey.store";

interface TransportationButtonProps {
  buttonName: string;
}

const TransportationButton = ({ buttonName }: TransportationButtonProps) => {
  // const { transportation, setTransportation } = useOptionalSurveyStore();
  const transportation = useOptionalSurveyStore(
    (state) => state.transportation
  );
  const setTransportation = useOptionalSurveyStore(
    (state) => state.setTransportation
  );
  const isClicked = transportation.includes(buttonName);

  const handleClick = () => {
    if (isClicked) {
      setTransportation(transportation.filter((item) => item !== buttonName));
    } else {
      setTransportation([...transportation, buttonName]);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "bg-[#F1F1F1] rounded-[4px] w-[53px] h-[28px] place-content-center text-black/70 hover:cursor-pointer hover:bg-[#C3C3C3] hover:text-black text-[12px]",
        isClicked && "!bg-[#C3C3C3] !text-black"
      )}
    >
      {buttonName}
    </button>
  );
};

export default TransportationButton;
