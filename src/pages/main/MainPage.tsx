import { useEffect, useState } from "react";
import CountryButton from "../../components/button/CountryButton";
import SearchBar from "../../components/SearchBar";
import CityCard from "../../components/card/CityCard";
import { COUNTRY_CITY } from "../../constants/countries";
import usePrefetchCityInfos from "../../hooks/usePrefetchCityInfos";
import clsx from "clsx";

const MainPage = () => {
  usePrefetchCityInfos();

  const [result, setResult] = useState<string>("");
  const [clickedCountry, setClickedCountry] = useState<string>("전체");
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState<boolean>(false);

  useEffect(() => {
    const countries = Object.keys(COUNTRY_CITY);
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    const randomIndex = Math.random() < 0.5 ? 1 : 2;

    setResult(`${randomCountry}-${randomIndex}`);
  }, []);

  useEffect(() => {
    const trimmedInput = inputValue?.trim();
    if (!trimmedInput) {
      setSearchResult([]);
      return;
    }

    const matched: string[] = [];

    Object.entries(COUNTRY_CITY).forEach(([country, cities]) => {
      cities.forEach((city) => {
        const fullName = `${country} ${city}`;
        if (fullName.includes(trimmedInput)) matched.push(fullName);
      });
    });

    setClickedCountry("전체");

    // 조합 중일 때 결과가 없으면, 이전 결과 유지 (검색결과 업데이트 안 함)
    if (isComposing && matched.length === 0) return;

    // 조합 중이 아니거나, 결과가 있을 경우 갱신
    setSearchResult(matched);
  }, [inputValue, isComposing]);

  return (
    <>
      <article
        style={{ backgroundImage: `url(/images/countries/${result}.webp)` }}
        className="h-[380px] w-full bg-cover bg-[50%_40%] flex justify-center items-center"
      >
        <div className="flex flex-col gap-[8px]">
          <p className="font-bold text-[25px] text-center text-white [text-shadow:2px_2px_10px_rgba(0,0,0)]">
            여행지 찾기
          </p>
          <SearchBar
            placeholder="원하는 여행지를"
            main
            inputValue={inputValue}
            setInputValue={setInputValue}
            setIsComposing={setIsComposing}
          />
        </div>
      </article>
      <section className="px-[100px] pt-[15px]">
        <div className="flex flex-wrap gap-[12px]">
          <CountryButton
            isSelected={clickedCountry === "전체"}
            clickedCountry={clickedCountry}
            onClicked={() => setClickedCountry("전체")}
          >
            전체
          </CountryButton>
          {Object.keys(COUNTRY_CITY).map((country) => (
            <CountryButton
              key={country}
              isSelected={clickedCountry === country}
              clickedCountry={clickedCountry}
              onClicked={() => setClickedCountry(country)}
            >
              {country}
            </CountryButton>
          ))}
        </div>
        <div
          className={clsx(
            "py-[20px] gap-x-[35px] gap-y-[30px]",
            (clickedCountry !== "전체" &&
              COUNTRY_CITY[clickedCountry].length < 5) ||
              (clickedCountry === "전체" &&
                searchResult.length > 0 &&
                searchResult.length < 5)
              ? "flex flex-wrap"
              : "grid grid-cols-[repeat(auto-fit,_minmax(303.5px,_auto))] justify-between"
          )}
        >
          {inputValue?.trim()
            ? searchResult.length > 0 || isComposing
              ? searchResult.map((result) => (
                  <CityCard
                    key={result}
                    cardImg={`/images/cities/${result.split(" ")[1]}.webp`}
                    cardName={result}
                  />
                ))
              : null // 완성된 입력이고 결과 없음 → 아무것도 안 보임
            : clickedCountry === "전체"
            ? Object.entries(COUNTRY_CITY).flatMap(([country, cities]) =>
                cities.map((city) => (
                  <CityCard
                    key={city}
                    cardImg={`/images/cities/${city}.webp`}
                    cardName={`${country} ${city}`}
                  />
                ))
              )
            : COUNTRY_CITY[clickedCountry].map((city) => (
                <CityCard
                  key={city}
                  cardImg={`/images/cities/${city}.webp`}
                  cardName={`${clickedCountry} ${city}`}
                />
              ))}
        </div>
      </section>
    </>
  );
};

export default MainPage;
