import clsx from "clsx";
import TravelPlanModal from "../modal/TravelPlanModal";
import { useModalStore } from "../../stores/modal.store";
import { memo } from "react";
import { Confirm, Notify } from "notiflix";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteTravelPlan,
  navigateModificaitonPage,
  readDetailTravelPlan,
} from "../../apis/travelPlan.api";
import { useNavigate } from "react-router";

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
    const navigate = useNavigate();

    const openModal = useModalStore((state) => state.openModal);

    const { mutate: deleteTravelPlanMutate } = useMutation({
      mutationKey: ["deleteTravelPlan", cardId],
      mutationFn: deleteTravelPlan,
      onSuccess: (response) => {
        console.log("✅ 여행 계획 삭제 완료", response);
        Notify.success("여행 계획이 삭제되었습니다.", {
          fontFamily: "SUIT-Regular",
        });
      },
      onError: (err) => {
        console.error("❌ 여행 계획 삭제 실패", err);
        Notify.failure("여행 계획을 삭제하지 못했습니다.", {
          fontFamily: "SUIT-Regular",
        });
      },
      retry: 1,
    });

    const { refetch } = useQuery({
      queryKey: ["navigateModificaitonPage", cardId],
      queryFn: () => navigateModificaitonPage({ id: cardId }),
      enabled: false,
    }); // 이거 여행 계획 페이지에서 호출 (수정 여부 확인해서)

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
      console.log(data); // 이 데이터를 전역상태에 넣어서
      navigate("/travel-plan"); // 여행 계획 페이지로 이동
    };

    const handleDeleteTravelPlan = () => {
      Confirm.show(
        "Tranner",
        `정말로 <b><${travelTitle}></b> 여행 계획을 삭제하시겠습니까?`,
        "네",
        "아니요",
        () => {
          // 여행 계획 삭제 로직
          deleteTravelPlanMutate({ id: cardId });
        },
        () => {},
        {
          width: "400px",
          borderRadius: "10px",
          fontFamily: "SUIT-Regular",
          plainText: false,
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
              <p className="text-[20px] font-bold">{travelTitle}</p>

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
