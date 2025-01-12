import { useState, useEffect } from "react";
import styles from "./CustomStepper.module.scss";
import { languages } from "@/utils/languages-dictionnary";

const CustomStepper = ({ currentStep = 1, lang }) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		setProgress(currentStep === 2 ? 100 : 0);
	}, [currentStep]);

	return (
		<div
			className={`${styles.stepperContainer} ${
				lang === languages.arabic ? styles.rtl : ""
			}`}
		>
			<div className={styles.stepper}>
				{/* Step 1 */}
				<div
					className={`${styles.step} ${
						currentStep >= 1 ? styles.active : ""
					}`}
				>
					<div className={styles.stepCircle}>1</div>
					<div className={styles.stepLabel}>
						{lang === languages.arabic ? "الخطوة 1" : "Step 1"}
					</div>
				</div>

				{/* Progress Line */}
				<div className={styles.progressLineContainer}>
					<div
						className={styles.progressLine}
						style={{ width: `${progress}%` }}
					/>
				</div>

				{/* Step 2 */}
				<div
					className={`${styles.step} ${
						currentStep >= 2 ? styles.active : ""
					}`}
				>
					<div className={styles.stepCircle}>2</div>
					<div className={styles.stepLabel}>
						{lang === languages.arabic ? "الخطوة 2" : "Step 2"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomStepper;
