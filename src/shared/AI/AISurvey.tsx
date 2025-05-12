import { useState } from "react";
import SurveyHeader from "./SurveyHeader";
import EssentialQuestions from "./EssentialQuestions";
import OptionalQuestions from "./OptionalQuestions";

const AISurvey = () => {
  const [isClickedEssential, setIsClickedEssential] = useState<boolean>(true);

  return (
    <div className="scrollbar-partial-rounded fixed bottom-[40px] right-[85px]">
      <div className="rounded-[10px] bg-white px-[15px] pt-[10px] pb-[20px] [box-shadow:0px_0px_20px_rgba(0,0,0,0.6)] w-[357px] h-[500px] overflow-y-auto scrollbar-custom">
        <SurveyHeader
          isClickedEssential={isClickedEssential}
          setIsClickedEssential={setIsClickedEssential}
        />
        <section className="mt-[20px]">
          {isClickedEssential ? <EssentialQuestions /> : <OptionalQuestions />}
        </section>
      </div>
    </div>
  );
};

export default AISurvey;
