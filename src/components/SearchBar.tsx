interface SearchBarProps {
  placeholder: string;
}

const SearchBar = ({ placeholder }: SearchBarProps) => {
  return (
    <div className="flex justify-between px-[20px] py-[10px] bg-white rounded-[6px] w-[500px] h-[60px] [box-shadow:6px_6px_10px_rgba(0,0,0)]">
      <input
        type="text"
        placeholder={`${placeholder} 검색하세요.`}
        className="outline-none w-[400px] text-black placeholder:text-[#b8b8b8] placeholder:text-[14px]"
      />
      <img src="/images/search.svg" alt="search" />
    </div>
  );
};

export default SearchBar;
