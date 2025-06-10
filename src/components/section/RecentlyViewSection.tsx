import { Link } from "react-router";
import RecentPlaceCard from "../card/RecentPlaceCard";
import { RecentPlace } from "../../types/place.type";
import clsx from "clsx";

interface RecentlyViewSectionProps {
  recentPlaces: RecentPlace[];
  maxCount?: number; // MyPage에선 5개, RecentlyViewPage에선 전체
  showMyPageLink?: boolean; // 마이페이지 이동 링크 여부
  linkToMyPage?: string; // 마이페이지 링크 주소
  showHeaderLink?: boolean; // "더보기" 링크 여부
  linkToHeader?: string; // "더보기"로 이동한 페이지 링크 주소
}

const RecentlyViewSection = ({
  recentPlaces,
  maxCount,
  showMyPageLink = false,
  linkToMyPage,
  showHeaderLink = false,
  linkToHeader,
}: RecentlyViewSectionProps) => {
  const displayedPlaces = maxCount
    ? recentPlaces.slice(0, maxCount)
    : recentPlaces;

  return (
    <section className="flex flex-col gap-[5px] mb-[30px]">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-[7px]">
          {showMyPageLink && (
            <>
              <Link to={linkToMyPage!} className="text-[18px] hover:font-bold">
                내 정보
              </Link>
              <h1>{">"}</h1>
            </>
          )}
          <h1 className="font-bold text-[22px]">최근에 본 장소📍</h1>
        </div>
        {showHeaderLink && (
          <Link
            to={linkToHeader!}
            className="text-[12px] text-[#a6a6a6] mr-[3px]"
          >
            더보기
          </Link>
        )}
      </div>
      <div
        className={clsx(
          "gap-x-[20px] gap-y-[30px]",
          displayedPlaces.length <= 4
            ? "flex"
            : "grid grid-cols-[repeat(auto-fit,_minmax(247.8px,_auto))] justify-between"
        )}
      >
        {displayedPlaces &&
          displayedPlaces.map((place) => (
            <RecentPlaceCard
              key={place.placeId}
              cardImg={place.photoUrl ?? "/images/default.png"}
              countryName={`${place.countryName} ${place.regionName}`}
              placeName={place.placeName}
              placeId={place.placeId}
            />
          ))}
      </div>
    </section>
  );
};

export default RecentlyViewSection;
