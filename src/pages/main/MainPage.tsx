import { useState } from "react";
import CountryButton from "../../components/button/CountryButton";
import SearchBar from "../../components/SearchBar";
import CityCard from "../../components/card/CityCard";
import { COUNTRY_CITY } from "../../constants/countries";

const MainPage = () => {
  const [clickedCountry, setClickedCountry] = useState<string>("대한민국");

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
          <SearchBar placeholder="원하는 여행지를" main />
        </div>
      </article>
      <section className="px-[100px] pt-[15px]">
        <div className="flex flex-wrap gap-[12px]">
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
        <div className="py-[20px] flex flex-wrap gap-x-[35px] gap-y-[30px]">
          {COUNTRY_CITY[clickedCountry].map((city) => (
            <CityCard
              key={city}
              cardImg={`/images/cities/${city}.jpg`}
              cardName={`${clickedCountry} ${city}`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default MainPage;
