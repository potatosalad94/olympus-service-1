import { classNames } from "primereact/utils";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";

const Layout = ({
	children,
	headerPrice,
	terms,
	termsVisibility,
	lang,
	onRootClick,
	step,
	logo,
	fullscreenPlayer,
	skipTopPriceDesc,
}) => {
	return (
		<div className={styles.container} onClick={onRootClick}>
			<div style={{ height: termsVisibility ? "auto" : "100dvh" }}>
				<Header
					skipTopPriceDesc={skipTopPriceDesc}
					text={headerPrice}
					lang={lang}
					step={step}
					logo={logo}
				/>
				<div
					className={classNames(styles.children_wrapper, {
						[styles.isFullscreen]: fullscreenPlayer,
					})}
				>
					{children}
				</div>
			</div>

			<Footer content={terms} />
		</div>
	);
};

export default Layout;
