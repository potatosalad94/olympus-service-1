export const errorToast = (summary, errorMessage) => {
	return {
		severity: "error",
		summary: summary || "Error",
		detail: errorMessage || "Something wrong happened",
		life: 3000,
	};
};
