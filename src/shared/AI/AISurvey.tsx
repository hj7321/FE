import { useState } from "react";
import SurveyHeader from "./SurveyHeader";
import EssentialQuestions from "./EssentialQuestions";
import OptionalQuestions from "./OptionalQuestions";

const AISurvey = () => {
  const [isClickedEssential, setIsClickedEssential] = useState<boolean>(true);

  return (
    <div className="rounded-[10px] bg-white px-[15px] pt-[10px] pb-[20px] [box-shadow:3px_3px_10px_rgba(0,0,0,0.25)] w-[357px] h-[500px] fixed bottom-[40px] right-[85px] overflow-y-auto scrollbar-custom">
      <SurveyHeader
        isClickedEssential={isClickedEssential}
        setIsClickedEssential={setIsClickedEssential}
      />
      <section className="mt-[20px]">
        {isClickedEssential ? <EssentialQuestions /> : <OptionalQuestions />}
      </section>
    </div>
  );
};

export default AISurvey;
