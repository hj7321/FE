export type CheckEmailType = {
  email: string;
};

export type CheckIdType = {
  id: string;
};

export type CheckCodeType = CheckEmailType & {
  code: number;
};

export type LoginType = CheckIdType & {
  pw: string;
};

export type SignupType = LoginType & CheckEmailType;
