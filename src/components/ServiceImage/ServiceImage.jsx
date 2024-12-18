import styles from "./ServiceImage.module.scss";
import CircularProgress from "@/components/CircularProgress/CircularProgress";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ServiceImage = ({ playButton, isLoading, image, onShowModal, step, fullscreenPlayer }) => {
	const [showPlaceholder, setShowPlaceholder] = useState(true);

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

					{showPlaceholder && <div style={{ height: "500px" }}></div>}

					<LazyLoadImage
						alt={"service"}
						className={classNames({
							[styles.isFullscreen]: fullscreenPlayer,
						})}
						effect="blur"
						wrapperProps={{
							style: { transitionDelay: "1s" },
						}}
						src={image}
						onLoad={() => setShowPlaceholder(false)}
					/>
				</Button>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};

export default ServiceImage;
