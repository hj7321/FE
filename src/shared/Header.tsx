import { Link } from "react-router";
import { useAuthStore } from "../stores/auth.store";
import { useState } from "react";
import clsx from "clsx";

const Header = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isLogin = useAuthStore((state) => state.isLogin);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="px-[100px] py-[10px] flex items-center justify-between">
      <Link
        to="/"
        className="flex gap-[10px] items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="/images/logo.svg"
          alt="logo"
          className={clsx(
            "[filter:drop-shadow(5px_5px_2px_rgba(0,0,0,0.25))] h-[53px] aspect-[4/5]",
            isHovered && "![filter:drop-shadow(5px_5px_2px_rgba(0,0,0,0.5))]"
          )}
        />
        <p
          className={clsx(
            "font-bold text-[35px] [text-shadow:3px_3px_5px_rgba(0,0,0,0.25)]",
            isHovered && "![text-shadow:3px_3px_5px_rgba(0,0,0,0.5)]"
          )}
        >
          Tranner
        </p>
      </Link>
      <div className="flex gap-[45px] text-[14px]">
        {isLogin ? (
          <>
            <Link to="/my">내 정보</Link>
            <button
              onClick={() => logout()}
              className="hover:cursor-pointer hover:font-bold"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:font-bold">
              로그인
            </Link>
            <Link to="/sign-up" className="hover:font-bold">
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
