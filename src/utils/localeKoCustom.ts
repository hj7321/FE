import { ko } from "date-fns/locale";

const customKo = {
  ...ko,
  formatLong: {
    ...ko.formatLong,
    date: () => "yyyy년 M월", // <-- 여기만 바꾸면 됨!
  },
};

export default customKo;
