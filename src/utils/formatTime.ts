// 초 단위로 되어 있는 time을 분:초(MM:SS) 형식으로 변환하는 함수
export const formatTime = (time: number): string => {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  // 1. 전체 시간을 60으로 나눈 몫(=분)을 구함
  // 2. 숫자를 문자열로 바꿈
  // 3. 문자열이 2자리가 안 되면 앞에 "0"을 붙여서 형식을 맞춤
  const seconds = String(time % 60).padStart(2, "0");
  // 1. 전체 시간을 60으로 나눈 나머지(=초)를 구함
  // 2. 숫자를 문자열로 바꿈
  // 3. 문자열이 2자리가 안 되면 앞에 "0"을 붙여서 형식을 맞춤
  return `${minutes} : ${seconds}`;
};
