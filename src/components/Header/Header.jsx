import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import styles from "./Header.module.scss";

const Header = ({ text, lang }) => {
	return (
		<div className={styles.container}>
			<p>{text}</p>
			<LanguageDropdown lang={lang} />
		</div>
	);
};

export default Header;
