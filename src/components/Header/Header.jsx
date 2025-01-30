import { forwardRef } from "react";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import styles from "./Header.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Header = forwardRef(({ text, lang, step, logo, availableLanguages, css }, ref) => {
	const {
		topPriceDescFontColor,
		topPriceDescFontSize,
		topPriceDescFontStyle,
		topPriceDescFontWeight,
	} = css || {};

	return (
		<>
			{text && (
				<div ref={ref} className={styles.header}>
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
					<p
						style={{
							color: topPriceDescFontColor,
							fontSize: topPriceDescFontSize,
							fontStyle: topPriceDescFontStyle,
							fontWeight: topPriceDescFontWeight,
						}}
					>
						{text}
					</p>
					<div className={styles.language_wrapper}>
						<LanguageDropdown
							availableLanguages={availableLanguages}
							lang={lang}
							step={step}
						/>
					</div>
				</div>
			)}

			{/* <div
				ref={divRef}
				className={classNames(styles.container, {
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
			</div> */}
		</>
	);
});

export default Header;
