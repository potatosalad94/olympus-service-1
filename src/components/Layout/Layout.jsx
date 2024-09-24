import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";

const Layout = ({ children, headerPrice, terms, termsVisibility, lang }) => {
	return (
		<div className={styles.container}>
			<div style={{ height: termsVisibility ? "auto" : "100dvh" }}>
				<Header text={headerPrice} lang={lang} />
				<div className={styles.children_wrapper}>{children}</div>
			</div>

			<Footer content={terms} />
		</div>
	);
};

export default Layout;
