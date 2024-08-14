import styles from "./Footer.module.scss";

const Footer = ({ content }) => {
	return (
		<div className={styles.container}>
			<p>{content}</p>
		</div>
	);
};

export default Footer;
