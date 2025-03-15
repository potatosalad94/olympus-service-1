import styles from "./Footer.module.scss";

const Footer = ({ content, additionalInformation }) => {
	if (!content && !additionalInformation) return null;
	return (
		<div className={styles.container}>
			{/* {content && <p>{content}</p>} //TODO  */}
			{additionalInformation && <p>{additionalInformation}</p>}
		</div>
	);
};

export default Footer;
