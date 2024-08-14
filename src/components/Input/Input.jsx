import { InputMask } from "primereact/inputmask";
import { useState } from "react";
import styles from "./Input.module.scss";

const Input = () => {
	const [value, setValue] = useState();

	return (
		<div className={styles.container}>
			<InputMask
				value={value}
				onChange={(e) => setValue(e.target.value)}
				mask="059 999 9999"
				placeholder="05x xxx xxxx"
			/>
		</div>
	);
};

export default Input;
