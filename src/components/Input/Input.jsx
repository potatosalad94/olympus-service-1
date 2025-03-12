import { InputMask } from "primereact/inputmask";
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
		},
		ref
	) => {
		return (
			<div className={styles.container}>
				<FloatLabel pt={{ root: { style: { width: "100%" } } }}>
					<IconField
						iconPosition="left"
						className={styles.input_wrapper}
					>
						<InputIcon>
							<PhoneIcon className={styles.smartphone_icon} />
						</InputIcon>
						<InputMask
							id={name}
							autoClear={false}
							ref={ref}
							name={name}
							onChange={onChange}
							onBlur={onBlur}
							mask={`${dialCode}9 999 9999`}
							placeholder="05"
							className={classNames(styles.input, {
								"p-invalid": error,
							})}
							onClick={onClick}
							value={value}
							type={type}
							autoComplete={"tel"}
							inputMode={"tel"}
						/>
						{!disabled && (
							<div className={styles.checkmark_container}>
								<i
									className={`pi pi-check-circle ${styles.checkmark_animation}`}
								></i>
							</div>
						)}
					</IconField>
					<label htmlFor={name}>Phone Number</label>
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
