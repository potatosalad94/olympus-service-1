import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import styles from "./LanguageDropdown.module.scss";

const LanguageDropdown = () => {
	const [selectedLanguage, setSelectedLanguage] = useState({
		name: "English",
		code: "en",
	}); //TODO >> inital state should be dynamic

	const languages = [
		{ name: "English", code: "en" },
		{ name: "العربية", code: "ar" },
	];

	return (
		<>
			<Dropdown
				value={selectedLanguage}
				onChange={(e) => setSelectedLanguage(e.value)}
				options={languages}
				optionLabel="name"
				className={styles.dropdown}
			/>
		</>
	);
};

export default LanguageDropdown;
