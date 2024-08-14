import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";

const Layout = ({ children, headerPrice, terms }) => {
	return (
		<div className={styles.container}>
			<Header text={headerPrice} />

			<div className={styles.children_wrapper}>{children}</div>

			<Footer content={terms} />
		</div>
	);
};

export default Layout;
