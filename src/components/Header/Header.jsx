import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import styles from "./Header.module.scss";

const Header = ({ text, lang, step }) => {
	return (
		<div className={styles.container}>
			<p>{text}</p>
			<LanguageDropdown lang={lang} step={step} />
		</div>
	);
};

export default Header;
