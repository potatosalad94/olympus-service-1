import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import styles from "./LegalPageLayout.module.scss";
import LanguageWrapper from "../LanguageWrapper/LanguageWrapper";

const LegalPageLayout = ({ title, children }) => {
	const navigate = useNavigate();
	const { languageCode } = useParams();
	const isRtl = languageCode === "ar";

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<LanguageWrapper>
			<div className={styles.legalPage}>
				<div className={styles.header}>
					<Button
						icon={isRtl ? "pi pi-arrow-right" : "pi pi-arrow-left"}
						className={styles.backButton}
						onClick={handleBack}
						text
					/>
					<h1 className={styles.title}>{title}</h1>
				</div>
				<div className={styles.content}>{children}</div>
			</div>
		</LanguageWrapper>
	);
};

export default LegalPageLayout;
