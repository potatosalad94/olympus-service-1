/**
 * Regex pattern to validate UAE phone numbers in various formats:
 * - +9715xxxxxxxx (international format with plus)
 * - 9715xxxxxxxx (international format without plus)
 * - 009715xxxxxxxx (international format with 00)
 * - 05xxxxxxxx (local UAE format with leading zero)
 * - 5xxxxxxxx (local UAE format without leading zero)
 */
export const UAE_PHONE_REGEX =
    /^(\+9715\d{8}|9715\d{8}|009715\d{8}|05\d{8}|5\d{8})$/;
