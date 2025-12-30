import type { ApiResponse } from "../lib/apiModel";

/**
 * SafeRequest - A wrapped API helper that handles ApiResponse types
 * Returns the data directly or throws an error
 */
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export async function SafeRequest<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> {
	const url = `${baseURL}${endpoint}`;

	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		...options,
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(`API Error: ${response.status} - ${error.error}`);
	}

	const apiResponse: ApiResponse<T> = await response.json();

	// Type guard to ensure we have a successful response
	if (!apiResponse.success) {
		throw new Error(`API Error: ${apiResponse.error}`);
	}

	// Return the data directly, not the ApiResponse wrapper
	return apiResponse.data;
}
