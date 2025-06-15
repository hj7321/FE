import React from "react";
import clsx from "clsx";

interface TimeEditorProps {
  startHour: string;
  startMin: string;
  endHour: string;
  endMin: string;
  onChange: (sh: string, sm: string, eh: string, em: string) => void;
  onSubmit: () => void;
  onInputFocus: () => void;
  onInputBlur: () => void;
}

const TimeEditor = ({
  startHour,
  startMin,
  endHour,
  endMin,
  onChange,
  onSubmit,
  onInputFocus,
  onInputBlur,
}: TimeEditorProps) => {
  // 숫자만 입력, 2자리 제한
  const handleInput =
    (type: "startHour" | "startMin" | "endHour" | "endMin") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value.replace(/[^0-9]/g, "");
      if (val.length > 2) val = val.slice(0, 2);
      onChange(
        type === "startHour" ? val : startHour,
        type === "startMin" ? val : startMin,
        type === "endHour" ? val : endHour,
        type === "endMin" ? val : endMin
      );
    };

  // 엔터/blur 시 저장
  const handleBlurOrEnter = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key !== "Enter") return;
    onSubmit();
  };

  return (
    <div
      className={clsx(
        "text-[11px] leading-[16px] h-[16px] flex items-center gap-[2px] min-h-[16px]"
      )}
      style={{ minHeight: 16 }}
    >
      <input
        value={startHour}
        onChange={handleInput("startHour")}
        onBlur={onInputBlur}
        onKeyDown={handleBlurOrEnter}
        onFocus={onInputFocus}
        className="w-[18px] text-center outline-none text-[11px] leading-[16px] h-[16px] p-0 m-0 border-none bg-transparent"
        style={{
          border: "0.2px solid #999",
          boxSizing: "border-box",
        }}
        maxLength={2}
      />
      <span className="text-[11px] leading-[16px]">:</span>
      <input
        value={startMin}
        onChange={handleInput("startMin")}
        onBlur={onInputBlur}
        onKeyDown={handleBlurOrEnter}
        onFocus={onInputFocus}
        className="w-[18px] text-center outline-none text-[11px] leading-[16px] h-[16px] p-0 m-0 border-none bg-transparent"
        style={{
          border: "0.2px solid #999",
          boxSizing: "border-box",
        }}
        maxLength={2}
      />
      <span className="text-[11px] leading-[16px]">&nbsp;~&nbsp;</span>
      <input
        value={endHour}
        onChange={handleInput("endHour")}
        onBlur={onInputBlur}
        onKeyDown={handleBlurOrEnter}
        onFocus={onInputFocus}
        className="w-[18px] text-center outline-none text-[11px] leading-[16px] h-[16px] p-0 m-0 border-none bg-transparent"
        style={{
          border: "0.2px solid #999",
          boxSizing: "border-box",
        }}
        maxLength={2}
      />
      <span className="text-[11px] leading-[16px]">:</span>
      <input
        value={endMin}
        onChange={handleInput("endMin")}
        onBlur={onInputBlur}
        onKeyDown={handleBlurOrEnter}
        onFocus={onInputFocus}
        className="w-[18px] text-center outline-none text-[11px] leading-[16px] h-[16px] p-0 m-0 border-none bg-transparent"
        style={{
          border: "0.2px solid #999",
          boxSizing: "border-box",
        }}
        maxLength={2}
      />
    </div>
  );
};

export default TimeEditor;
