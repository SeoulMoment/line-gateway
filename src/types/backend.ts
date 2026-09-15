export interface MemberCheckResponse {
  result: boolean;
  exists: boolean;
  email?: string;
}

export interface EmailVerifyResponse {
  result: boolean;
}

export interface UserInfoResponse {
  result: boolean;
  data: {
    phone: string;
    email: string;
    newProductAgreed: boolean;
    adAgreed: boolean;
    recommendAgreed: boolean;
  };
}
