export const paramConfigs = {
	step: {
		validator: (step) => ["initial", "otp", "final"].includes(step),
		defaultValue: "initial",
	},
	page_type: {
		defaultValue: "",
	},
	utm_campaign: {
		defaultValue: "",
	},
	lang: {
		defaultValue: "",
	},
	gclid: {
		defaultValue: "",
	},
	utm_medium: {
		defaultValue: "",
	},
	utm_term: {
		defaultValue: "",
	},
	utm_content: {
		defaultValue: "",
	},
	utm_source: {
		defaultValue: "",
	},
	token: {
		defaultValue: "",
	},
	rsb: {
		defaultValue: "",
	},
};
