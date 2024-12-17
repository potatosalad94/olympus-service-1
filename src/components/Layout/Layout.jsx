import { classNames } from "primereact/utils";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";
import { useEffect, useRef } from "react";

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
	const divRef = useRef();

	const scrollToElement = () => {
		const { current } = divRef;
		if (current !== null) {
			current.scrollIntoView({ behavior: "instant" });
		}
	};

	useEffect(() => {
		if (skipTopPriceDesc) scrollToElement();
	}, [skipTopPriceDesc]);

	return (
		<div ref={divRef} className={styles.container} onClick={onRootClick}>
			<div style={{ height: termsVisibility ? "auto" : "100dvh" }}>
				<Header text={headerPrice} lang={lang} step={step} logo={logo} />
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
