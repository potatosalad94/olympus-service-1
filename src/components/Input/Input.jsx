import { InputMask } from "primereact/inputmask";
import styles from "./Input.module.scss";
import { forwardRef } from "react";
import { classNames } from "primereact/utils";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

const Input = forwardRef(
	({ dialCode = "", onChange, onBlur, name, error, onClick, value, type }, ref) => {
		return (
			<div className={styles.container}>
				<IconField iconPosition="left" className={styles.input_wrapper}>
					<InputIcon className="pi pi-mobile"></InputIcon>
					<InputMask
						ref={ref}
						name={name}
						onChange={onChange}
						onBlur={onBlur}
						mask={`${dialCode}9 999 9999`}
						placeholder="05x xxx xxxx"
						className={classNames(styles.input, {
							"p-invalid": error,
						})}
						onClick={onClick}
						value={value}
						type={type}
					/>
				</IconField>

				{error && (
					<small className={`p-error ${styles.animated_error}`}>{error.message}</small>
				)}
			</div>
		);
	}
);

export default Input;
