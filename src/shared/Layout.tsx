import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import TopButton from "./TopButton";
import AIButton from "./AI/AIButton";
import clsx from "clsx";
import ModalBackground from "../components/modal/ModalBackground";
import { useEffect, useRef } from "react";
import { useFavoriteListStore } from "../stores/favoriteList.store";
import useBasketMutations from "../hooks/useBasketMutations";

const Layout = () => {
  const { pathname }: { pathname: string } = useLocation();
  const hideLayoutPath = [
    "/login",
    "/sign-up",
    "/token-callback",
    "/travel-plan",
  ];
  const hideLayout = hideLayoutPath.some((path) => pathname.includes(path));

  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  // 바구니 관련 상태
  const addList = useFavoriteListStore((state) => state.addList);
  const deleteList = useFavoriteListStore((state) => state.deleteList);
  const resetAllList = useFavoriteListStore((state) => state.resetAllList);
  const countryName = useFavoriteListStore((state) => state.countryName);
  const regionName = useFavoriteListStore((state) => state.regionName);

  const { insertBasketDataMutate, deleteBasketDataMutate } = useBasketMutations(
    countryName!,
    regionName!
  );

  // 장소 탐색 페이지를 벗어날 때 → 장바구니 추가/삭제 api 요청
  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = location.pathname;

    const wasPlacePage = prevPath.startsWith("/place-exploration");
    const isPlacePage = currentPath.startsWith("/place-exploration");

    // 장소탐색 페이지 → 다른 페이지로 이동한 경우만 처리
    if (
      wasPlacePage &&
      !isPlacePage &&
      !currentPath.startsWith("/travel-plan")
    ) {
      if (addList.length > 0 && countryName && regionName) {
        insertBasketDataMutate({
          countryName,
          regionName,
          places: addList,
        });
      }

      if (deleteList.length > 0 && countryName && regionName) {
        for (const list of deleteList) {
          deleteBasketDataMutate({
            countryName,
            regionName,
            placeId: [list.placeId],
          });
        }
      }

      resetAllList();
    }

    prevPathRef.current = currentPath;
  }, [location.pathname]);

  // 창을 끌 때(브라우저를 종료할 때) → 장바구니 추가/삭제 api 요청
  // useEffect(() => {
  //   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //     const wasPlacePage = location.pathname.startsWith("/place-exploration");

  //     if (wasPlacePage) {
  //       if (addList.length > 0) {
  //         navigator.sendBeacon(
  //           `${BASE_URL}/basket/insert`,
  //           JSON.stringify({
  //             countryName,
  //             regionName,
  //             places: addList,
  //           })
  //         );
  //       }

  //       if (deleteList.length > 0) {
  //         deleteList.forEach((list) => {
  //           navigator.sendBeacon(
  //             `${BASE_URL}/basket/delete`,
  //             JSON.stringify({
  //               countryName,
  //               regionName,
  //               placeId: [list.placeId],
  //             })
  //           );
  //         });
  //       }

  //       resetAllList(); // 비우기
  //     }

  //     e.preventDefault(); // 일부 브라우저에서 필요
  //     e.returnValue = ""; // 크롬 등에서 unload 막기 위해 필요
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  // }, [location.pathname, addList, deleteList, countryName, regionName]);

  return (
    <>
      <ModalBackground />
      {!hideLayout && <Header />}
      <main
        className={clsx(
          "bg-[#EDEDED]",
          hideLayout ? "min-h-screen" : "min-h-[600px]"
        )}
      >
        <ScrollToTop />
        <Outlet />
      </main>
      <TopButton
        isExistedLikeButton={pathname.startsWith("/place-exploration")}
      />
      {!hideLayout && <AIButton />}
      {!hideLayout && <Footer />}
    </>
  );
};

export default Layout;
