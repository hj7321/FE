import SearchBar from "../../components/SearchBar";

const MainPage = () => {
  return (
    <>
      <article
        style={{ backgroundImage: "url('/images/countries/Italy.jpg')" }}
        className="h-[380px] w-full bg-cover bg-[50%_40%] flex justify-center items-center"
      >
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold text-[25px] text-center text-white [text-shadow:2px_2px_10px_rgba(0,0,0)]">
            여행지 찾기
          </p>
          <SearchBar placeholder="원하는 여행지를" />
        </div>
      </article>
      <section></section>
    </>
  );
};

export default MainPage;
