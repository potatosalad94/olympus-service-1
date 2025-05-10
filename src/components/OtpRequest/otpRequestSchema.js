import Joi from "joi";

const errorMessages = {
    en: {
        "string.empty": "Enter your phone number",
        "any.required": "Enter your phone number",
        "string.pattern.base": "Phone number format is invalid",
    },
    ar: {
        "string.empty": "يرجى إدخال رقم هاتفك",
        "any.required": "يرجى إدخال رقم هاتفك",
        "string.pattern.base": "تنسيق رقم الهاتف غير صالح",
    },
};

const otpRequestSchema = (language) =>
    Joi.object({
        contact: Joi.alternatives()
            .conditional("$showInput", {
                is: false,
                then: Joi.any().optional(),
                otherwise: Joi.string()
                    .required()
                    .pattern(/^(\+9715\d{8}|9715\d{8}|009715\d{8}|05\d{8})$/)
                    .messages(errorMessages[language]),
            })
            .label("Phone number"),
    });

export default otpRequestSchema;
