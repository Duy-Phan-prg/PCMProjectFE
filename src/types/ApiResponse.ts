// export type ApiResponse<T = any> = T & {
//   accessToken?: string;
//   success?: boolean;
//   data?: T;
//   meta?: unknown;
//   message?: string;
//   [key: string]: any;
// };

export interface ApiResponse<T> {
  status: string;
  payload: T;
  error: any;
}

export interface ErrorResponse {
  success?: boolean;
  data: {
    message?: string;
  };
  error?: [
    message?: string,
    field?: string,
  ];
}
