import { useState } from "react";
import AITooltip from "./AITooltip";
import AISurvey from "./AISurvey";

const AIButton = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState<boolean>(false);

  return (
    <div>
      {!showQuestionnaire && isHovered && <AITooltip />}
      {showQuestionnaire && <AISurvey />}
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-[10px] right-[10px]"
        onClick={() => setShowQuestionnaire(!showQuestionnaire)}
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
