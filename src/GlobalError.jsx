import { Button } from "primereact/button";
import { useNavigate, useRouteError } from "react-router-dom";
import { Card } from "primereact/card";
import styles from "./GlobalError.module.scss";

const GlobalError = () => {
	const navigate = useNavigate();
	const error = useRouteError();

	const isErrorInstance = error instanceof Error;

	return (
		<div className={styles.errorContainer}>
			<Card className={styles.errorCard}>
				<div className={styles.cardContent}>
					<div className={styles.iconWrapper}>
						<i className="pi pi-exclamation-triangle" />
					</div>

					{/* <div className={styles.errorCode}>{code}</div>
					<h2 className={styles.errorTitle}>{title}</h2>
					<p className={styles.errorMessage}>{message}</p> */}

					{isErrorInstance ? (
						<>
							<h1>Something went wrong!</h1>
							<p>
								Oops! It seems we're experiencing technical
								difficulties
							</p>
						</>
					) : (
						<>
							<div className={styles.errorCode}>
								{error.errorCode}
							</div>
							<p className={styles.errorMessage}>{error.error}</p>
						</>
					)}

					<Button
						label="Home"
						icon="pi pi-home"
						outlined
						onClick={() => navigate("/")}
					/>

					{/* <div className={styles.buttonContainer}>
						{showHome && (
							<Button
								label="Home"
								icon="pi pi-home"
								outlined
								onClick={handleHome}
							/>
						)}
						{showRefresh && (
							<Button
								label="Try Again"
								icon="pi pi-refresh"
								severity="warning"
								onClick={handleRefresh}
							/>
						)}
					</div> */}
				</div>
			</Card>
		</div>
	);
};

export default GlobalError;
