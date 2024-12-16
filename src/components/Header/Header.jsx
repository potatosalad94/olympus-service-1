import { classNames } from "primereact/utils";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import styles from "./Header.module.scss";
import { languages } from "@/utils/languages-dictionnary";

const Header = ({ text, lang, step, logo }) => {
	return (
		<>
			<div className={styles.price_wrapper}>
				<p>{text}</p>
			</div>

			<div
				className={classNames(styles.container, {
					[styles.reverse]: lang === languages.arabic,
					[styles.hasLogo]: !!logo,
				})}
			>
				{logo && <img src={logo} alt="logo" className={styles.logo} />}
				<LanguageDropdown lang={lang} step={step} />
			</div>
		</>
	);
};

export default Header;
