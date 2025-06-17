import { useState } from "react";
import AITooltip from "./AITooltip";
import AISurvey from "./AISurvey";
import { useAuthStore } from "../../stores/auth.store";
import { Report } from "notiflix";
import { useNavigate } from "react-router";

const AIButton = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState<boolean>(false);
  const navigate = useNavigate();

  const isLogin = useAuthStore((state) => state.isLogin);

  const handleShowQuestionnaire = () => {
    if (!isLogin) {
      Report.failure(
        "<b>Tranner</b>",
        "<div class='text-center'>로그인 후에 이용해주세요.</div>",
        "확인",
        () => {
          navigate("/login");
        },
        {
          messageFontSize: "16px",
          titleFontSize: "20px",
          fontFamily: "SUIT-Regular",
          plainText: false,
          zindex: 9999,
          borderRadius: "8px",
          svgSize: "60px",
        }
      );
      return;
    }
    setShowQuestionnaire(!showQuestionnaire);
  };

  return (
    <div>
      {!showQuestionnaire && isHovered && <AITooltip />}
      {showQuestionnaire && <AISurvey />}
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-[10px] right-[10px]"
        onClick={handleShowQuestionnaire}
      >
        <img
          src="/images/ai-button.svg"
          alt="ai"
          className="h-[70px] aspect-square hover:cursor-pointer"
        />
      </button>
    </div>
  );
};

export default AIButton;
