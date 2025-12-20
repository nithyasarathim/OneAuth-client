export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  user?: T;
  [key: string]: unknown;
}

export type ProfileApiResponse = ApiResponse<null>;
