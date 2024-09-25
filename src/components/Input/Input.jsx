import { InputMask } from "primereact/inputmask";
import styles from "./Input.module.scss";
import { forwardRef } from "react";

const Input = forwardRef(
	({ defaultValue = "", onChange, onBlur, name, error, onClick }, ref) => {
		return (
			<div className={styles.container}>
				<InputMask
					ref={ref}
					name={name}
					defaultValue={defaultValue}
					onChange={onChange}
					onBlur={onBlur}
					mask={`${defaultValue}9 999 9999`}
					placeholder="05x xxx xxxx"
					className={error ? "p-invalid" : ""}
					onClick={onClick}
				/>
				{error && <small className="p-error">{error.message}</small>}
			</div>
		);
	}
);

export default Input;
