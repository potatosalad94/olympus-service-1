import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./LanguageWrapper.module.scss";

const LanguageWrapper = ({ children }) => {
	const { languageCode } = useParams();
	const isRtl = languageCode === "ar";

	useEffect(() => {
		document.body.setAttribute("dir", isRtl ? "rtl" : "ltr");
		document.body.setAttribute("lang", languageCode);

		return () => {
			// Clean up when component unmounts
			document.body.removeAttribute("dir");
			document.body.removeAttribute("lang");
		};
	}, [languageCode, isRtl]);

	return (
		<div
			className={`${styles.container} ${isRtl ? styles.rtl : styles.ltr}`}
		>
			{children}
		</div>
	);
};

export default LanguageWrapper;
