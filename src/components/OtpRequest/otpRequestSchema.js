import Joi from "joi";
import { UAE_PHONE_REGEX } from "@/utils/phoneValidation";

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
                    .pattern(UAE_PHONE_REGEX)
                    .messages(errorMessages[language]),
            })
            .label("Phone number"),
    });

export default otpRequestSchema;
