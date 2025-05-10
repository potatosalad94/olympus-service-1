import { InputText } from "primereact/inputtext";
import styles from "./Input.module.scss";
import { forwardRef } from "react";
import { classNames } from "primereact/utils";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FloatLabel } from "primereact/floatlabel";
import PhoneIcon from "@images/smartphone.svg?react";
import { languages } from "@/utils/languages-dictionnary";

const Input = forwardRef(
    (
        {
            dialCode = "",
            onChange,
            onBlur,
            name,
            error,
            onClick,
            value,
            type,
            disabled = false,
            isAnimated = true,
            phoneNumberNative,
            langCode,
        },
        ref
    ) => {
        return (
            <div
                className={classNames(styles.container, {
                    [styles.heartbeat_animation]: isAnimated && !error,
                })}
            >
                <FloatLabel pt={{ root: { style: { width: "100%" } } }}>
                    <IconField
                        iconPosition={
                            langCode === languages.arabic ? "right" : "left"
                        }
                        className={styles.input_wrapper}
                    >
                        <InputIcon
                            style={{
                                ...(langCode === languages.arabic && {
                                    right: "0.5rem",
                                    left: "unset",
                                }),
                                ...(langCode === languages.english && {
                                    left: "0.5rem",
                                    right: "unset",
                                }),
                            }}
                        >
                            <PhoneIcon className={styles.smartphone_icon} />
                        </InputIcon>
                        <InputText
                            id={name}
                            ref={ref}
                            name={name}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder={dialCode}
                            className={classNames(styles.input, {
                                "p-invalid": error,
                            })}
                            style={{
                                textAlign:
                                    langCode === languages.arabic
                                        ? "right"
                                        : "left",
                            }}
                            onClick={onClick}
                            value={value}
                            type={type}
                            autoComplete="tel"
                            inputMode="tel"
                        />
                        {!disabled && (
                            <div
                                className={classNames(
                                    styles.checkmark_container,
                                    {
                                        [styles.checkmark_container_rtl]:
                                            langCode === languages.arabic,
                                    }
                                )}
                            >
                                <i
                                    className={`pi pi-check-circle ${styles.checkmark_animation}`}
                                ></i>
                            </div>
                        )}
                    </IconField>
                    <label
                        style={{
                            ...(langCode === languages.arabic && {
                                right: "0.75rem",
                                left: "unset",
                                padding: "0 30px 0 0",
                            }),
                            ...(langCode === languages.english && {
                                left: "0.75rem",
                                right: "unset",
                                padding: "0 0 0 30px",
                            }),
                        }}
                        htmlFor={name}
                    >
                        {phoneNumberNative}
                    </label>
                </FloatLabel>
                {error && (
                    <small className={`p-error ${styles.animated_error}`}>
                        {error.message}
                    </small>
                )}
            </div>
        );
    }
);

export default Input;
