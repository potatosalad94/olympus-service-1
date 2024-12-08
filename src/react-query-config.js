// react-query-config.js
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { errorToast } from "./utils/toast-messages";
// import { toast } from "react-toastify"; // if you still want to keep this as fallback

export const createQueryClient = (showToast) => {
	return new QueryClient({
		queryCache: new QueryCache({
			// onSuccess: (data, query) => {
			// 	// Prefer custom showToast if provided, fallback to react-toastify

			// 	if (query.meta?.successMessage) {
			// 		showToast(query.meta.successMessage);
			// 	}
			// },
			onError: (error, query) => {
				// Only show toast for non-500 & non-404 errors that aren't already being handled by the error boundary
				if (
					(error.status < 500 || error.code < 500) &&
					query.meta?.enableError !== false
				) {
					showToast(errorToast(error));
					// window.location = "/"; //! redirect

					// if (query.meta?.errorMessage) {
					// 	showToast(errorToast(`${query.meta.errorMessage}`));
					// } else {
					// 	showToast(errorToast(error));
					// }
				}
			},
		}),
		mutationCache: new MutationCache({
			// onSuccess: (data, variables, context, mutation) => {
			// 	if (mutation.meta?.successMessage) {
			// 		showToast(mutation.meta?.successMessage);
			// 	}
			// },
			onError: (error, variables, context, mutation) => {
				if (
					(error.status < 500 || error.code < 500) &&
					mutation.meta?.enableError !== false
				) {
					showToast(errorToast(error));
					// window.location = "/"; //! redirect

					// if (mutation.meta?.errorMessage) {
					// 	showToast(`${mutation.meta.errorMessage}`);
					// } else {
					// 	showToast(errorToast(error));
					// }
				}
			},
		}),
		defaultOptions: {
			queries: {
				retry: false,
				refetchOnWindowFocus: false,
				useErrorBoundary: (error) => {
					return error.status >= 500 || error.code >= 500;
				},
			},
			mutations: {
				useErrorBoundary: (error) => {
					return error.status >= 500 || error.code >= 500;
				},
			},
		},
	});
};
