// import { Button } from "primereact/button";
import { Card } from "primereact/card";
import styles from "./Confirmation.module.scss";

const Confirmation = ({ onContinue }) => {
	return (
		<div className={styles.confirmationContainer}>
			<Card className={styles.confirmationCard}>
				<div className={styles.cardContent}>
					<div className={styles.successIcon}>
						<i className="pi pi-check-circle" />
					</div>

					<p className={styles.message}>Thank you for subscribing!</p>

					{/* <div className={styles.buttonContainer}>
						<Button
							label="Continue"
							icon="pi pi-arrow-right"
							onClick={onContinue}
						/>
					</div> */}
				</div>
			</Card>
		</div>
	);
};

export default Confirmation;
