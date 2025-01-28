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
	campaign: {
		defaultValue: "",
	},
	adgroup: {
		defaultValue: "",
	},
	creative: {
		defaultValue: "",
	},
	adid: {
		defaultValue: "",
	},
	headline: {
		defaultValue: "",
	},
	targetid: {
		defaultValue: "",
	},
	keyword: {
		defaultValue: "",
	},
	escapedkeyword: {
		defaultValue: "",
	},
	placement: {
		defaultValue: "",
	},
	target: {
		defaultValue: "",
	},
	network: {
		defaultValue: "",
	},
	isthirdpartyserved: {
		defaultValue: "",
	},
};
