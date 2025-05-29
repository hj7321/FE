import clsx from "clsx";
import { useState } from "react";

interface AuthInputProps {
  label: string;
  name: string;
  type: string;
  short?: boolean;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const AuthInput = ({
  label,
  name,
  type,
  short,
  inputValue,
  onChange,
  onKeyDown,
}: AuthInputProps) => {
  const [inputType, setInputType] = useState<string>(type);

  const handleChangeInputType = (type: "text" | "password") => {
    if (type === "text") setInputType("password");
    if (type === "password") setInputType("text");
  };

  // console.log(label, ": ", inputValue);

  return (
    <label>
      <p className="text-[12px] mb-[1px] text-[#333333]">{label}</p>
      <div
        className={clsx(
          "px-[15px] h-[45px] bg-white rounded-[4px] [box-shadow:2px_2px_5px_rgba(0,0,0,0.25)] flex items-center justify-between",
          short ? "w-[132px]" : "w-[250px]"
        )}
      >
        <input
          type={inputType}
          name={name}
          className={clsx(
            "outline-none text-[15px]",
            short ? "w-[90px]" : "w-[190px]"
          )}
          value={inputValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoComplete="off"
        />
        {inputType === "password" && label.includes("비밀번호") && (
          <img
            src="/images/eye-open.svg"
            alt="eye"
            className="text-[10px] w-[20px] hover:cursor-pointer"
            onClick={() => handleChangeInputType(inputType)}
          />
        )}
        {inputType === "text" && label.includes("비밀번호") && (
          <img
            src="/images/eye-closed.svg"
            alt="eye"
            className="text-[10px] w-[20px] hover:cursor-pointer"
            onClick={() => handleChangeInputType(inputType)}
          />
        )}
      </div>
    </label>
  );
};

export default AuthInput;
