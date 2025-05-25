import clsx from "clsx";

interface SearchBarProps {
  placeholder: string;
  main?: boolean;
  placeExploration?: boolean;
  inputValue: string | null;
  setInputValue: React.Dispatch<React.SetStateAction<string | null>>;
  setIsComposing: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({
  placeholder,
  main,
  placeExploration,
  inputValue,
  setInputValue,
  setIsComposing,
}: SearchBarProps) => {
  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className={clsx(
        "flex justify-between px-[20px] py-[10px] bg-white rounded-[6px] w-[450px] h-[55px]",
        main && "[box-shadow:6px_6px_10px_rgba(0,0,0)]",
        placeExploration && "[box-shadow:6px_6px_10px_rgba(0,0,0,0.2)]"
      )}
    >
      <input
        type="text"
        placeholder={`${placeholder} 검색하세요.`}
        value={inputValue ?? ""}
        onChange={handleChangeInputValue}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={(e) => {
          setInputValue(e.currentTarget.value);
          setIsComposing(false);
        }}
        className="outline-none w-[370px] text-black placeholder:text-[#b8b8b8] placeholder:text-[14px]"
      />
      <img src="/images/search.svg" alt="search" className="text-[10px]" />
    </div>
  );
};

export default SearchBar;
