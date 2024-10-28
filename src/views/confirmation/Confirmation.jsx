import styles from "./Confirmation.module.scss";

const Confirmation = () => {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.content}>
					<div className={styles.checkmark}>
						<svg
							viewBox="0 0 24 24"
							width="24"
							height="24"
							stroke="currentColor"
							strokeWidth="2"
							fill="none"
						>
							<polyline points="20 6 9 17 4 12" />
						</svg>
					</div>

					<h1 className={styles.title}>Thank you for subscribing!</h1>
				</div>
			</div>
		</div>
	);
};

export default Confirmation;
