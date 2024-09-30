import Joi from "joi";

const formSchema = Joi.object({
	contact: Joi.string()
		.when(Joi.ref("$phoneEntryBox"), {
			is: null,
			then: Joi.optional(),
			otherwise: Joi.string()
				.required()
				.custom((value, helpers) => {
					const { phoneEntryBox } = helpers.prefs.context;
					const numericValue = value.replace(/\s/g, ""); // Remove spaces, but keep as string

					if (!/^\d+$/.test(numericValue)) {
						return helpers.error("number.base");
					}

					const regex = new RegExp(`^${phoneEntryBox}\\d{8}$`);

					if (!regex.test(numericValue)) {
						return helpers.error("string.pattern.base");
					}

					return numericValue; // Return original value without spaces
				})
				.messages({
					"string.empty": "Phone number can't be empty",
					"number.base": "Phone number must contain only numbers",
					"string.pattern.base": "Phone number format is invalid",
				}),
		})
		.label("Phone number"),
});

export default formSchema;
