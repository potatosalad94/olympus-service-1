import { Button } from "primereact/button";
import { useNavigate, useRouteError } from "react-router-dom";
import styles from "./GlobalError.module.scss";

const GlobalError = () => {
	const navigate = useNavigate();
	const error = useRouteError();
	const isErrorInstance = error instanceof Error;

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{isErrorInstance ? (
					<>
						<h1 className={styles.message}>
							Something went wrong!
						</h1>
						<p className={styles.description}>
							Oops! It seems we're experiencing technical
							difficulties
						</p>
					</>
				) : (
					<>
						<h1 className={styles.title}>
							{error.status || error.code}
						</h1>
						{/* <p className={styles.message}>Page not found</p> */}
						<p className={styles.description}>
							{error.message || error.statusText}
						</p>
					</>
				)}

				<Button
					type="submit"
					label={"Go back home"}
					size={"large"}
					onClick={() => {
						navigate("/");
					}}
				/>
			</div>
		</div>
	);
};

export default GlobalError;
