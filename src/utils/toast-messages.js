export const errorToast = (text) => {
	return {
		severity: "error",
		summary: "Error",
		detail: text || "Something wrong happened",
		life: 3000,
	};
};
