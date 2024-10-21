import Joi from "joi";

const otpRequestSchema = Joi.object({
	contact: Joi.alternatives()
		.conditional("$showInput", {
			is: false,
			then: Joi.any().optional(),
			otherwise: Joi.string()
				.required()
				.custom((value, helpers) => {
					const { dialCode } = helpers.prefs.context;

					if (value === null || value === undefined) {
						return helpers.error("any.required");
					}

					const numericValue = value.replace(/\s/g, ""); // Remove spaces, but keep as string

					if (!/^\d+$/.test(numericValue)) {
						return helpers.error("number.base");
					}

					const regex = new RegExp(`^${dialCode}\\d{8}$`);

					if (!regex.test(numericValue)) {
						return helpers.error("string.pattern.base");
					}

					return numericValue; // Return original value without spaces
				})
				.messages({
					"string.empty": "Phone number can't be empty",
					"any.required": "Phone number is required",
					"number.base": "Phone number must contain only numbers",
					"string.pattern.base": "Phone number format is invalid",
				}),
		})
		.label("Phone number"),
});

export default otpRequestSchema;
