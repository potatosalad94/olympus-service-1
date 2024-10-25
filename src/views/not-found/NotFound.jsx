import styles from "./NotFound.module.scss";
import { Button } from "primereact/button";

const NotFound = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.title}>404</h1>
				<p className={styles.message}>Page not found</p>
				<p className={styles.description}>
					The page you are looking for might have been removed, had
					its name changed, or is temporarily unavailable.
				</p>

				<Button
					type="submit"
					label={"Go back home"}
					size={"large"}
					onClick={(e) => {
						e.stopPropagation();
					}}
				/>
			</div>
		</div>
	);
};

export default NotFound;
