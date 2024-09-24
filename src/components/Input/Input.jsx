import { InputMask } from "primereact/inputmask";
import { useState } from "react";
import styles from "./Input.module.scss";

const Input = ({ defaultValue = "" }) => {
	const [value, setValue] = useState(defaultValue);

	return (
		<div className={styles.container}>
			<InputMask
				value={value}
				onChange={(e) => setValue(e.target.value)}
				mask={`${defaultValue}9 999 9999`}
				placeholder="05x xxx xxxx"
			/>
		</div>
	);
};

export default Input;
