// 숫자 문자열에 3자리마다 콤마(,)를 추가하여 통화/금액 형식으로 변환하는 함수
export const formatNumber = (numeric: string) => {
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
