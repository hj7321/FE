import clsx from "clsx";

interface AuthInputProps {
  label: string;
  type: string;
  short?: boolean;
}

const AuthInput = ({ label, type, short }: AuthInputProps) => {
  return (
    <label>
      <p className="text-[12px] mb-[1px] text-[#333333]">{label}</p>
      <div
        className={clsx(
          "px-[15px] h-[45px] bg-white rounded-[4px] [box-shadow:2px_2px_5px_rgba(0,0,0,0.25)] flex items-center justify-between",
          short ? "w-[130px]" : "w-[250px]"
        )}
      >
        <input
          type={type}
          className={clsx(
            "outline-none text-[15px]",
            short ? "w-[90px]" : "w-[190px]"
          )}
        />
        {type === "password" && (
          <img
            src="/images/eye-open.svg"
            alt="eye"
            className="text-[10px] w-[20px] hover:cursor-pointer"
          />
        )}
      </div>
    </label>
  );
};

export default AuthInput;
