interface TypeButtonProps {
  buttonName: "전체보기" | "관광" | "맛집" | "숙소";
}

const TypeButton = ({ buttonName }: TypeButtonProps) => {
  return (
    <button className="bg-common rounded-[4px] text-[12px] px-[10px] py-[4px] w-fit h-fit text-white hover:cursor-pointer hover:bg-selected">
      {buttonName}
    </button>
  );
};

export default TypeButton;
