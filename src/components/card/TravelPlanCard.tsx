import clsx from "clsx";
import TravelPlanModal from "../modal/TravelPlanModal";
import { useModalStore } from "../../stores/modal.store";
import { memo } from "react";
import { Confirm, Notify } from "notiflix";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTravelPlan,
  navigateModificaitonPage,
  readDetailTravelPlan,
} from "../../apis/travelPlan.api";
import { useNavigate } from "react-router";
import { parseDetailSchedule } from "../../utils/parseDetailSchedult";
import { useScheduleStore } from "../../stores/schedule.store";
import { useDateStore } from "../../stores/date.store";
import { useFavoriteListStore } from "../../stores/favoriteList.store";

interface TravelPlanCardProps {
  cardId: number;
  cardImg: string;
  travelTitle: string;
  travelStartDate: string;
  travelEndDate: string;
  travelPeople: number;
  travelPlace: string;
  isEnded: boolean;
}

const TravelPlanCard = memo(
  ({
    cardId,
    cardImg,
    travelTitle,
    travelStartDate,
    travelEndDate,
    travelPeople,
    travelPlace,
    isEnded,
  }: TravelPlanCardProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const openModal = useModalStore((state) => state.openModal);
    const setDates = useDateStore((state) => state.setDates);
    const setEditModeOn = useScheduleStore((state) => state.setEditModeOn);
    const setMeta = useScheduleStore((state) => state.setMeta);
    const setSchedule = useScheduleStore((state) => state.setSchedule);
    const favStore = useFavoriteListStore.getState();

    const { mutate: deleteTravelPlanMutate } = useMutation({
      mutationKey: ["deleteTravelPlan", cardId],
      mutationFn: deleteTravelPlan,
      onSuccess: (response) => {
        console.log("✅ 여행 계획 삭제 완료", response);
        Notify.success("여행 계획이 삭제되었습니다.", {
          fontFamily: "SUIT-Regular",
          fontSize: "15px",
          zindex: 9999,
          timeout: 5000,
        });
        queryClient.invalidateQueries({ queryKey: ["readTravelPlanList"] });
      },
      onError: (err) => {
        console.error("❌ 여행 계획 삭제 실패", err);
        Notify.failure(
          "여행 계획을 삭제하지 못했습니다.<br />잠시 후에 다시 이용해주세요.",
          {
            fontFamily: "SUIT-Regular",
            fontSize: "15px",
            plainText: false,
            zindex: 9999,
            timeout: 5000,
          }
        );
      },
      retry: 1,
    });

    const { refetch } = useQuery({
      queryKey: ["navigateModificaitonPage", cardId],
      queryFn: () => navigateModificaitonPage({ id: cardId }),
      enabled: false,
    });

    const { refetch: readDetailTravelPlanRefetch } = useQuery({
      queryKey: ["readDetailTravelPlan", cardId],
      queryFn: () => readDetailTravelPlan({ id: cardId }),
      staleTime: 60 * 60 * 1000, // 1시간 동안 fresh 상태로 유지
      gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 유지 (garbage collection 대상 제외)
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
      refetchInterval: 10 * 60 * 1000, // 10분마다 자동 refetch (배경 refetch 포함)
    });

    const handleOpenModal = async () => {
      const { data: schedule } = await readDetailTravelPlanRefetch();
      if (!schedule) return;

      openModal(
        <TravelPlanModal
          schedule={schedule}
          cardImg={cardImg}
          isEnded={isEnded}
        />
      );
    };

    const handleEditTravelPlan = async () => {
      const { data } = await refetch();
      console.log(data);
      if (!data) return;

      const {
        scheduleName,
        startDate,
        endDate,
        howManyPeople,
        countryName,
        regionName,
        detailSchedule,
      } = data;
      const schedule = parseDetailSchedule(detailSchedule);

      setDates(new Date(startDate), new Date(endDate));
      setMeta({
        scheduleId: cardId,
        scheduleName,
        startDate,
        endDate,
        howManyPeople,
        countryName,
        regionName,
      });

      const firstDayKey = Math.min(...Object.keys(schedule).map(Number)); // 가장 빠른 daySeq
      const firstDay = schedule[firstDayKey];
      if (firstDay) {
        const firstTimeKey = Object.keys(firstDay).sort()[0]; // 가장 이른 시간
        const firstPlace = firstDay[firstTimeKey]?.[0];

        if (firstPlace) {
          favStore.resetAllList(); // 기존 장바구니 비우기
          favStore.setCountryName(data.countryName);
          favStore.setRegionName(data.regionName);
          favStore.updateAddList({
            placeId: firstPlace.placeId,
            placeName: firstPlace.placeName,
            placeType: firstPlace.placeType,
            photoUrl: undefined,
            address: firstPlace.address,
            latitude: firstPlace.latitude,
            longitude: firstPlace.longitude,
          });
        }
      }
      setSchedule(schedule);
      setEditModeOn();
      navigate("/travel-plan");
    };

    const handleDeleteTravelPlan = () => {
      // 여행 제목 길이에 비례해 픽셀 수 계산
      const baseWidth = 380; // 최소 너비(px)
      const charUnit = 6; // 글자당 픽셀(대략) - 폰트·패딩 맞춰 조절
      const calcWidth = baseWidth + travelTitle.length * charUnit;
      Confirm.show(
        "<b>Tranner</b>",
        `정말로 <b><${travelTitle}></b> 여행 계획을 삭제하시겠습니까?`,
        "네",
        "아니요",
        () => {
          deleteTravelPlanMutate({ id: cardId });
        },
        () => {},
        {
          width: `${calcWidth}px`,
          borderRadius: "8px",
          fontFamily: "SUIT-Regular",
          plainText: false,
          messageFontSize: "16px",
          titleFontSize: "20px",
        }
      );
    };

    return (
      <div
        onClick={handleOpenModal}
        className="flex bg-white p-[10px] rounded-[8px] h-fit gap-[10px] w-[650.4px] [box-shadow:4px_8px_4px_rgba(0,0,0,0.1)] hover:cursor-pointer"
      >
        <img
          src={cardImg}
          alt={travelPlace}
          loading="lazy"
          className="rounded-[4px] w-[280px] h-[170px] object-cover text-[12px]"
        />
        <div className="w-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <p className="text-[20px] font-bold truncate">{travelTitle}</p>

              <div
                className={clsx(
                  "mt-[2px] text-white text-[13px] rounded-[4px] px-[7px] py-[2px] h-fit w-fit",
                  isEnded ? "bg-[#72D862]" : "bg-[#F68363]"
                )}
              >
                {isEnded ? "완료" : "예정"}
              </div>
            </div>
            <p className="text-[#8e8e8e] mb-[15px]">
              {travelStartDate} ~ {travelEndDate}
            </p>
            <p>인원: {travelPeople}명</p>
            <p>여행 지역: {travelPlace}</p>
          </div>
          <div className="flex gap-[15px] justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditTravelPlan();
              }}
              className="text-[13px] text-[#a6a6a6] hover:cursor-pointer"
            >
              수정
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTravelPlan();
              }}
              className="text-[13px] text-[#a6a6a6] hover:cursor-pointer"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default TravelPlanCard;
