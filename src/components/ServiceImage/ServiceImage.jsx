import styles from "./ServiceImage.module.scss";
import CircularProgress from "@/components/CircularProgress/CircularProgress";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

const ServiceImage = ({ playButton, isLoading, image, onShowModal, step, fullscreenPlayer }) => {
	return (
		<div className={styles.service_img_container}>
			{image ? (
				<Button
					unstyled
					className={styles.image_button}
					onClick={
						step === "initial"
							? playButton
								? (e) => {
										e.stopPropagation();
										onShowModal();
								  }
								: undefined
							: undefined
					}
				>
					{playButton && !isLoading && <i className="pi pi-play-circle"></i>}
					{isLoading && (
						<i className={`pi pi-spin pi-spinner-dotted ${styles.rotating_icon}`}></i>
					)}
					<img
						src={image}
						className={classNames({
							[styles.isFullscreen]: fullscreenPlayer,
						})}
						alt=""
					/>
				</Button>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};

export default ServiceImage;
