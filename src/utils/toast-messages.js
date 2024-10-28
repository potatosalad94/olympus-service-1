export const errorToast = (error) => {
	return {
		severity: "error",
		summary: error.title || "Error",
		detail: error.message || "Something wrong happened",
		life: 3000,
	};
};
