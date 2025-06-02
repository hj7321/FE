import { useEffect } from "react";
import { useAuthStore } from "../../stores/auth.store";
import { useNavigate } from "react-router";

// 소셜 로그인 후 토큰을 받기 위한 페이지
const TokenCallback = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    // 토큰을 전달받는 이벤트 핸들러 함수 정의
    const receiveToken = (event: MessageEvent) => {
      // 보안을 위해 특정 origin에서만 메시지를 받도록 제한할 수 있음
      // if (event.origin !== "http://localhost:8081") return; // 보안 체크
      const { accessToken } = event.data || {};
      if (accessToken) {
        console.log("🔐 토큰 수신:", accessToken);
        login(accessToken);
        navigate("/");
      }
    };

    // window 객체에 message 이벤트 리스너 추가 (다른 창이나 iframe에서 postMessage로 보낸 메시지를 수신함)
    window.addEventListener("message", receiveToken);

    return () => window.removeEventListener("message", receiveToken);
  }, []);

  return <div>로그인 처리 중입니다...</div>;
};

export default TokenCallback;
