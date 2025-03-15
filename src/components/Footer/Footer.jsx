import { languages } from "@/utils/languages-dictionnary";
import styles from "./Footer.module.scss";

const Footer = ({ content, additionalInformation, lang }) => {
	if (!content && !additionalInformation) return null;

	const renderContent = () => {
		if (!content) return null;

		return Object.values(content).map((item, index) => {
			if (typeof item === "string") {
				return <p key={index}>{item}</p>;
			} else if (Array.isArray(item)) {
				return (
					<ul key={index} className={styles.bulletList}>
						{item.map((bulletPoint, bulletIndex) => (
							<li key={bulletIndex} className={styles.bulletItem}>
								{bulletPoint}
							</li>
						))}
					</ul>
				);
			}
			return null;
		});
	};

	return (
		<div
			className={styles.container}
			style={{
				direction: lang?.code === languages.arabic ? "rtl" : "ltr",
			}}
		>
			{renderContent()}
			{additionalInformation && <p>{additionalInformation}</p>}
		</div>
	);
};

export default Footer;
