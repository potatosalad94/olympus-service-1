import Joi from "joi";

const otpConfirmSchema = Joi.object({
	otp: Joi.string()
		.required()
		.length(4)
		.pattern(/^[0-9]+$/)
		.messages({
			"any.required": "OTP is required",
			"string.empty": "OTP is required",
			"string.length": "OTP must be exactly 4 characters long",
			"string.pattern.base": "OTP must contain only digits",
		}),
});

export default otpConfirmSchema;
