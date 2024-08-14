import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import styles from "./Header.module.scss";

const Header = ({ text }) => {
	return (
		<div className={styles.container}>
			<p>{text}</p>
			<LanguageDropdown />
		</div>
	);
};

export default Header;
