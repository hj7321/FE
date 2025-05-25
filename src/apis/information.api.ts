import axios from "axios";
import { PageData, WikipediaApiResponse } from "../types/pageData.type";

const WIKIPEDIA_URL = "https://ko.wikipedia.org";

export const getPlaceInformation = async (placeName: string) => {
  const url = `${WIKIPEDIA_URL}/w/api.php`;
  const params = {
    action: "query",
    prop: "extracts",
    format: "json",
    origin: "*", // CORS 우회
    exintro: "true", // 첫 섹션만 가져오기
    titles: placeName,
  };

  try {
    const response = await axios.get(url, { params });
    const wikipediaData: WikipediaApiResponse = response.data;
    const data: PageData = Object.values(wikipediaData.query.pages)[0];
    const textData = data.extract;
    if (!textData) {
      console.warn(
        `[getPlaceInformation] ${placeName} 문서는 있지만 본문 없음`
      );
      return "설명 없음";
    }

    const result = `<div class="flex flex-col gap-y-[10px] leading-[1.6]">${textData}</div>`;

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        // 케이스 1: AxiosError + 404 Not Found
        // 정상적인 상황 중 하나로 간주 (예: '서울'은 있지만 '헝가리 강남구'에 대한 문서는 없음)
        // 그래서 fallback 값("설명 없음")을 반환해 사용자에게 보여주고 끝냄 -> throw 안 함
        console.warn(
          `[getPlaceInformation] ${placeName}에 대한 위키피디아 문서 없음`
        );
        return "설명 없음";
      } else {
        // 케이스 2: AxiosError + 그 외 오류 (500, 403 등)
        // 위키 서버 오류(500), 권한 없음(403), 네트워크 오류 등
        // 개발자가 확인할 수 있도록 콘솔에 로그 남김
        // 이 경우는 심각한 문제일 수 있으므로 -> throw 하는 게 좋음
        console.error("[getPlaceInformation] Axios 에러: ", error.message);
      }
    } else {
      // 케이스 3: Axios가 아닌 일반 에러
      // 예: 코드 오류, JSON 파싱 실패, null 접근 등
      // Axios와 무관한 예외이므로 별도로 분리
      // 이것도 throw 해서 상위에서 잡는 게 일반적
      console.error("[getPlaceInformation] 일반 에러: ", error);
    }
    throw error;
  }
};
