import { classNames } from "primereact/utils";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";
import { useEffect, useRef, useState } from "react";

const Layout = ({
	children,
	headerPrice,
	terms,
	lang,
	availableLanguages,
	onRootClick,
	step,
	logo,
	css,
}) => {
	const { termsVisibility, fullscreenPlayer, skipTopPriceDesc, additionalInformation } =
		css || {};

	const [headerHeight, setHeaderHeight] = useState(0);
	const headerRef = useRef(null);
	const observerRef = useRef(null);

	useEffect(() => {
		const measureHeight = () => {
			if (headerRef.current) {
				const height = headerRef.current.getBoundingClientRect().height;
				setHeaderHeight(height);
			}
		};

		// Créer ResizeObserver
		observerRef.current = new ResizeObserver(measureHeight);

		// Observer le Header
		if (headerRef.current) {
			observerRef.current.observe(headerRef.current);
		}

		// Mesurer après chargement des images
		window.addEventListener("load", measureHeight);

		return () => {
			// Cleanup
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
			window.removeEventListener("load", measureHeight);
		};
	}, [skipTopPriceDesc]);

	return (
		<div className={styles.container} onClick={onRootClick}>
			<div
				// className={classNames({
				// 	[styles.main_wrapper]: !termsVisibility,
				// 	// [styles.skipPriceHeader]: skipTopPriceDesc,
				// 	// [styles.fullscreenPlayer]: fullscreenPlayer,
				// })}
				style={{
					flexBasis:
						!termsVisibility && skipTopPriceDesc
							? `calc(100vh + ${headerHeight}px)`
							: undefined,
				}}
			>
				<Header
					ref={headerRef}
					text={headerPrice}
					lang={lang}
					availableLanguages={availableLanguages}
					step={step}
					logo={logo}
					css={css}
				/>
				<div
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
