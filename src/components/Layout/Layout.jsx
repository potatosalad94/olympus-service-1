import { classNames } from "primereact/utils";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";
import { useScrollToElement } from "@/hooks/useScrollToElement";

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
	const divRef = useScrollToElement(fullscreenPlayer);

	return (
		<div className={styles.container} onClick={onRootClick}>
			<div
				className={classNames({
					[styles.main_wrapper]: !termsVisibility,
					[styles.skipPriceHeader]: skipTopPriceDesc,
				})}
			>
				<Header
					skipTopPriceDesc={skipTopPriceDesc}
					text={headerPrice}
					lang={lang}
					step={step}
					logo={logo}
				/>
				<div
					ref={divRef}
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
