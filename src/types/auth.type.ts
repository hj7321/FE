export type CheckEmailType = {
  email: string;
};

export type CheckCodeType = CheckEmailType & {
  code: number;
};

export type LoginType = {
  id: string;
  pw: string;
};

export type SignupType = LoginType & CheckEmailType;
