import { InputMask } from "primereact/inputmask";
import styles from "./Input.module.scss";
import { forwardRef } from "react";

const Input = forwardRef(
	(
		{ dialCode = "", onChange, onBlur, name, error, onClick, value, type },
		ref
	) => {
		return (
			<div className={styles.container}>
				<InputMask
					ref={ref}
					name={name}
					onChange={onChange}
					onBlur={onBlur}
					mask={`${dialCode}9 999 9999`}
					placeholder="05x xxx xxxx"
					className={error ? "p-invalid" : ""}
					onClick={onClick}
					value={value}
					type={type}
				/>
				{error && <small className="p-error">{error.message}</small>}
			</div>
		);
	}
);

export default Input;
