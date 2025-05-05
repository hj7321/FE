interface AuthInputProps {
  label: string;
  type: string;
}

const AuthInput = ({ label, type }: AuthInputProps) => {
  return (
    <label>
      <p className="text-[13px] mb-[2px] text-[#333333]">{label}</p>
      <div className="px-[15px] w-[250px] h-[47px] bg-white rounded-[4px] [box-shadow:2px_2px_5px_rgba(0,0,0,0.25)] flex items-center">
        <input type={type} className="outline-none w-[200px]" />
      </div>
    </label>
  );
};

export default AuthInput;
