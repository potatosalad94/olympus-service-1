import { classNames } from "primereact/utils";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";
// import { useScrollToElement } from "@/hooks/useScrollToElement";

const Layout = ({
	children,
	headerPrice,
	terms,
	termsVisibility,
	lang,
	availableLanguages,
	onRootClick,
	step,
	logo,
	fullscreenPlayer,
	skipTopPriceDesc,
	additionalInformation,
}) => {
	// const divRef = useScrollToElement(fullscreenPlayer);

	return (
		<div className={styles.container} onClick={onRootClick}>
			<div
				className={classNames({
					[styles.main_wrapper]: !termsVisibility,
					[styles.skipPriceHeader]: skipTopPriceDesc,
					[styles.fullscreenPlayer]: fullscreenPlayer,
				})}
			>
				<Header
					skipTopPriceDesc={skipTopPriceDesc}
					text={headerPrice}
					lang={lang}
					availableLanguages={availableLanguages}
					step={step}
					logo={logo}
				/>
				<div
					// ref={divRef}
					className={classNames(styles.children_wrapper, {
						[styles.isFullscreen]: fullscreenPlayer,
					})}
				>
					{children}
				</div>
			</div>

			<Footer content={terms} additionalInformation={additionalInformation} />
		</div>
	);
};

export default Layout;
