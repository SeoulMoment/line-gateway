export interface ApiResponse<T> {
  result: boolean;
  data: T;
}

export interface UserInfo {
  phone: string;
  email: string;
  newProductAgreed: boolean;
  adAgreed: boolean;
  recommendAgreed: boolean;
}
