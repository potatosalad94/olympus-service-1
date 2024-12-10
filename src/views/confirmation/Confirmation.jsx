import { useEffect, useState } from "react";
import styles from "./Confirmation.module.scss";

const SECONDS = 10;

const Confirmation = ({ data }) => {
	const { subscriptionConfirmationPageText, subscriptionConfirmationPageTitle, redirection } =
		data;

	const [countdown, setCountdown] = useState(SECONDS);

	useEffect(() => {
		if (countdown === 0) {
			window.location.replace(redirection);
			return;
		}

		const timer = setInterval(() => {
			setCountdown((prevCount) => prevCount - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [countdown, redirection]);

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

					<h1 className={styles.title}>{subscriptionConfirmationPageTitle}</h1>
					<p>{subscriptionConfirmationPageText}</p>

					<div className={styles.redirectTimer}>
						<p className={styles.message}>
							{`You will be redirected in ${countdown} seconds`}
						</p>
						<a href={redirection} target={"_self"} className={styles.fallbackLink}>
							Click here if you are not redirected automatically
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Confirmation;
