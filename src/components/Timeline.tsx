import clsx from "clsx";

interface TimelineProps {
  dayNum: number;
  numOfCard: number;
}

const Timeline = ({ dayNum, numOfCard }: TimelineProps) => {
  return (
    <div
      style={{
        border: `1px solid var(--color-day${dayNum})`,
        height: `${numOfCard * 65}px`,
      }}
      className={clsx("w-[0px] ml-[4.5px] mt-[-3px] mb-[-3px]")}
    ></div>
  );
};

export default Timeline;
