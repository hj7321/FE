import clsx from "clsx";
import { useEffect, useState } from "react";

interface TopButtonProps {
  isExistedLikeButton: boolean;
}

const TopButton = ({ isExistedLikeButton }: TopButtonProps) => {
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    // 스크롤 위치에 따라 탑버튼 표시 여부를 결정하는 함수
    const toggleVisibility = () => {
      if (window.scrollY > 90)
        setShowButton(true); // 스크롤이 90px을 넘으면 버튼을 보이도록 설정
      else setShowButton(false); // 그렇지 않으면 버튼을 숨김
    };

    window.addEventListener("scroll", toggleVisibility); // 스크롤 이벤트 리스너 추가

    return () => window.removeEventListener("scroll", toggleVisibility); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
  });

  // 페이지를 맨 위로 부드럽게 스크롤하는 함수
  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={clsx(
        showButton ? "flex" : "hidden",
        "fixed right-[10px]",
        isExistedLikeButton ? "bottom-[150px]" : "bottom-[80px]"
      )}
      onClick={ScrollToTop}
    >
      <img
        src="/images/up-arrow.svg"
        alt="up"
        className="h-[70px] aspect-square hover:cursor-pointer"
      />
    </button>
  );
};

export default TopButton;
