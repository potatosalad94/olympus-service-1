import { InputText } from "primereact/inputtext";
import styles from "./Input.module.scss";
import { forwardRef } from "react";
import { classNames } from "primereact/utils";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FloatLabel } from "primereact/floatlabel";
import PhoneIcon from "@images/smartphone.svg?react";

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
                    <IconField className={styles.input_wrapper}>
                        <InputIcon
                            style={{
                                left: "0.5rem",
                                right: "unset",
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
                            onClick={onClick}
                            value={value}
                            type={type}
                            autoComplete="tel"
                            inputMode="tel"
                        />
                        {!disabled && (
                            <div className={styles.checkmark_container}>
                                <i
                                    className={`pi pi-check-circle ${styles.checkmark_animation}`}
                                ></i>
                            </div>
                        )}
                    </IconField>
                    <label
                        style={{
                            left: "0.75rem",
                            right: "unset",
                            padding: "0 0 0 30px",
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
