import { useNavigate } from "react-router";
import CityBasicInfo from "../information/CityBasicInfo";
import CityInfo from "../information/CityInfo";
import { useModalStore } from "../../stores/modal.store";

interface CityModalProps {
  cardName: string;
  cardImg: string;
}

const CityModal = ({ cardName, cardImg }: CityModalProps) => {
  const { closeModal } = useModalStore();
  const navigate = useNavigate();

  const handleDecideTravelArea = () => {
    closeModal();
    navigate(`/place-exploration/${cardName}`);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex gap-[10px] p-[20px] bg-white rounded-[8px] w-2/3 h-[560px] [box-shadow:4px_4px_20px_rgba(0,0,0,0.25)] relative"
    >
      <button onClick={closeModal} className="absolute right-[12px] top-[12px]">
        <img
          src="/images/close.svg"
          alt="close"
          className="text-[10px] h-[14px] hover:cursor-pointer"
        />
      </button>
      <div className="flex flex-col gap-[20px] w-3/5">
        <h1 className="font-bold text-[30px]">{cardName}</h1>
        <CityBasicInfo />
        <CityInfo />
      </div>
      <div className="flex flex-col justify-end w-1/2 gap-[15px]">
        <img
          src={cardImg}
          alt={cardName}
          className="text-[14px] h-[400px] w-full object-cover"
        />
        <div className="flex justify-between">
          <button className="w-[100px] rounded-[4px] flex justify-center items-center gap-[5px] tsext-black bg-[#efefef] text-[13px] py-[10px] px-[15px] hover:cursor-pointer hover:bg-[#dddddd]">
            <img
              src="/images/accommodation.svg"
              alt="accommodation"
              className="h-[17px] w-[25px]"
            />
            <p>숙소</p>
          </button>
          <button className="w-[100px] rounded-[4px] flex justify-center items-center gap-[5px] text-black bg-[#efefef] text-[13px] py-[10px] px-[15px] hover:cursor-pointer hover:bg-[#dddddd]">
            <img
              src="/images/plane-ticket.svg"
              alt="plane-ticket"
              className="h-[20px] w-[25px]"
            />
            <p>항공권</p>
          </button>
          <button
            onClick={handleDecideTravelArea}
            className="w-[210px] text-center rounded-[4px] text-white bg-common py-[10px] px-[15px] text-[14px] hover:bg-selected hover:cursor-pointer"
          >
            여행 지역 정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityModal;
