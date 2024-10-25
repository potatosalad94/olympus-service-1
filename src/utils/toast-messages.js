export const errorToast = (error) => {
	return {
		severity: "error",
		summary: error.error.title || "Error",
		detail: error.error.message || "Something wrong happened",
		life: 3000,
	};
};
