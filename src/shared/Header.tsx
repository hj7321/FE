import { Link } from "react-router";

const Header = () => {
  return (
    <header className="px-[100px] py-[10px] flex items-center justify-between">
      <Link
        to="/"
        className="flex gap-[10px] transition-transform items-center duration-300 hover:scale-103"
      >
        <img
          src="/images/logo.svg"
          alt="logo"
          className="[filter:drop-shadow(5px_5px_2px_rgba(0,0,0,0.25))] h-[53px] aspect-[4/5]"
        />
        <p className="font-bold text-[35px] [text-shadow:3px_3px_5px_rgba(0,0,0,0.25)]">
          Tranner
        </p>
      </Link>
      <div className="flex gap-[45px]">
        {/* 비로그인 시 */}
        <Link to="/login" className="hover:font-bold">
          로그인
        </Link>
        <Link to="/sign-up" className="hover:font-bold">
          회원가입
        </Link>
        {/* 로그인 시 */}
        {/* <Link to="/my">내 정보</Link>
        <button>로그아웃</button> */}
      </div>
    </header>
  );
};

export default Header;
