import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../stores/auth.store";
import { useState } from "react";
import clsx from "clsx";
import { useFavoriteListStore } from "../stores/favoriteList.store";
import useBasketMutations from "../hooks/useBasketMutations";

const Header = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();
  const isLogin = useAuthStore((state) => state.isLogin);
  const logout = useAuthStore((state) => state.logout);
  const addList = useFavoriteListStore((state) => state.addList);
  const deleteList = useFavoriteListStore((state) => state.deleteList);
  const countryName = useFavoriteListStore((state) => state.countryName);
  const regionName = useFavoriteListStore((state) => state.regionName);
  const resetName = useFavoriteListStore((state) => state.resetName);
  const resetAllList = useFavoriteListStore((state) => state.resetAllList);

  const { insertBasketDataMutateAsync, deleteBasketDataMutateAsync } =
    useBasketMutations(countryName!, regionName!);

  const handleLogout = async () => {
    if (countryName && regionName) {
      if (addList.length > 0) {
        await insertBasketDataMutateAsync({
          countryName,
          regionName,
          places: addList,
        });
      }

      for (const list of deleteList) {
        await deleteBasketDataMutateAsync({
          countryName,
          regionName,
          placeId: [list.placeId],
        });
      }
      resetName();
      resetAllList();
    }
    navigate("/");
    logout();
  };

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
              onClick={handleLogout}
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
