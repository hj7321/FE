import { ReadPlaceDetailResponse } from "../../types/place.type";

interface PlaceInfoProps {
  placeData: ReadPlaceDetailResponse;
}

const PlaceInfo = ({ placeData }: PlaceInfoProps) => {
  return (
    <div className="text-[14.5px] flex flex-col gap-[10px]">
      {placeData.phoneNumber && (
        <div className="flex gap-[6px]">
          <img src="/images/phone.svg" alt="phone" />
          <p>{placeData.phoneNumber}</p>
        </div>
      )}
      {placeData.openingHours && (
        <div className="flex gap-[7px] items-start">
          <img src="/images/time.svg" alt="time" className="mt-[4px]" />
          <div className="flex flex-col">
            {placeData.openingHours?.weekdayText?.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      )}
      <p className="overflow-y-auto scrollbar-custom pr-[10px]">
        {placeData.summary ?? "내용이 없습니다."}
      </p>
    </div>
  );
};

export default PlaceInfo;
