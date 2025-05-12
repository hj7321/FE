const CityBasicInfo = () => {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex gap-[15px] items-center">
        <div className="flex w-[53px] justify-between items-center">
          <img
            src="/images/flight.svg"
            alt="flight"
            className="w-[20px] h-[20px] text-[10px]"
          />
          <p className="text-[#8A8A8A] text-[15px]">항공</p>
        </div>
        <p className="text-[15px]">없음</p>
      </div>
      <div className="flex gap-[15px] items-center">
        <div className="flex w-[53px] justify-between items-center">
          <img
            src="/images/time-difference.svg"
            alt="time-difference"
            className="w-[20px] h-[20px] text-[10px]"
          />
          <p className="text-[#8A8A8A] text-[15px]">시차</p>
        </div>
        <p className="text-[15px]">없음</p>
      </div>
      <div className="flex gap-[15px] items-center">
        <div className="flex w-[53px] justify-between items-center">
          <img
            src="/images/visa.svg"
            alt="visa"
            className="w-[20px] h-[20px] text-[10px]"
          />
          <p className="text-[#8A8A8A] text-[15px]">비자</p>
        </div>
        <p className="text-[15px]">없음</p>
      </div>
      <div className="flex gap-[15px] items-center">
        <div className="flex w-[53px] justify-between items-center">
          <img
            src="/images/voltage.svg"
            alt="voltage"
            className="w-[20px] h-[20px] text-[10px]"
          />
          <p className="text-[#8A8A8A] text-[15px]">전압</p>
        </div>
        <p className="text-[15px]">없음</p>
      </div>
    </div>
  );
};

export default CityBasicInfo;
