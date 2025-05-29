import "../../styles/loader.css";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[3px] h-full">
      <div className="matrix-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
