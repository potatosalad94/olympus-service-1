import { classNames } from "primereact/utils";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import styles from "./Header.module.scss";
import { languages } from "@/utils/languages-dictionnary";
// import { useLayoutEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useScrollToElement } from "@/hooks/useScrollToElement";

const Header = ({ text, lang, step, logo, skipTopPriceDesc }) => {
	// const divRef = useRef();

	// const scrollToElement = () => {
	// 	const { current } = divRef;
	// 	if (current !== null) {
	// 		current.scrollIntoView({ behavior: "instant", block: "start" });
	// 	}
	// };

	// useLayoutEffect(() => {
	// 	if (skipTopPriceDesc) {
	// 		scrollToElement();
	// 	}
	// }, [skipTopPriceDesc]);

	const divRef = useScrollToElement(skipTopPriceDesc);

	return (
		<>
			{text && (
				<div className={styles.price_wrapper}>
					<p>{text}</p>
				</div>
			)}

			<div
				ref={divRef}
				className={classNames(styles.container, {
					[styles.reverse]: lang === languages.arabic,
					[styles.hasLogo]: !!logo,
				})}
			>
				<LazyLoadImage
					alt={"logo"}
					className={styles.logo}
					effect="blur"
					wrapperProps={{
						style: { transitionDelay: "1s" },
					}}
					src={logo}
					height={300}
					width={300}
				/>

				<LanguageDropdown lang={lang} step={step} />
			</div>
		</>
	);
};

export default Header;
