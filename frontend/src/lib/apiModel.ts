export interface ApiSuccess<T> {
	success: true;
	data: T;
	message: string;
}
export interface ApiError {
	error: string;
	success: false;
}
export type ApiResponse<T> = ApiSuccess<T> | ApiError;
