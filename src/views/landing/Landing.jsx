import FormComponent from "@/components/FormComponent/FormComponent";
import useNewVisit from "@/hooks/useNewVisit";
import Layout from "@components/Layout/Layout";
import { Button } from "primereact/button";
import { useCallback, useRef, useState } from "react";
import styles from "./Landing.module.scss";

const serviceName = "Service_1";

const Landing = () => {
	const formRef = useRef(null);

	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [timeoutId, setTimeoutId] = useState(null);

	const handleShowModal = useCallback(() => {
		setIsLoading(true);

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		const newTimeoutId = setTimeout(() => {
			setIsLoading(false);
			setShowModal(true);
			formRef.current.reset();
		}, 1000);

		setTimeoutId(newTimeoutId);
	}, [timeoutId]);

	// * ====== NEW VIST CALL ======

	const {
		query: { data: newVisitData, isFetching: isFetchingNewVisit },
		storedVisitorId: visitorId,
	} = useNewVisit(
		serviceName,
		true
		// 1 // testResponse
	);

	const { css, content, heRequired, currentLanguage } = newVisitData || {};

	const { clickableZone, termsV, playButton, closableModal } = css ?? {};

	const {
		acknowledgment,
		bottomPriceDescription,
		cta,
		exitButton,
		image,
		imageSteps,
		phoneEntryBox,
		dialCode,
		serviceDescription,
		termsAndConditions,
		topPriceDescription,
		userInstructions,
		// newOtpRequest,
		// otpConfirmTimer,
		// popupCta,
		// popupInstructions,
	} = content || {};

	const handleRequestOtp = (response) => {
		console.log("THE RESPONSE >>", response.data);
	};

	if (isFetchingNewVisit)
		return (
			<div className={styles.loading_container}>
				<i
					className={`pi pi-spin pi-spinner-dotted ${styles.rotating_icon} ${styles.page_spinner}`}
				></i>
			</div>
		);

	if (heRequired) return <div> Should do a HE redirect + call Post HE</div>;

	return (
		<Layout
			headerPrice={topPriceDescription ?? ""}
			terms={termsAndConditions ?? ""}
			termsVisibility={termsV}
			lang={currentLanguage}
			onRootClick={() => {
				if (showModal) {
					return;
				} else {
					setShowModal(true);
					formRef.current.reset();
				}
			}}
		>
			{imageSteps && (
				<div className={styles.logo_container}>
					<img src={imageSteps} alt="steps" />
				</div>
			)}

			{image && (
				<div className={styles.logo_container}>
					<Button
						unstyled
						className={styles.image_button}
						onClick={
							playButton
								? (e) => {
										e.stopPropagation();
										handleShowModal();
								  }
								: undefined
						}
					>
						{playButton && !isLoading && (
							<i className="pi pi-play-circle"></i>
						)}
						{isLoading && (
							<i
								className={`pi pi-spin pi-spinner-dotted ${styles.rotating_icon}`}
							></i>
						)}
						<img src={image} alt="" />
					</Button>
				</div>
			)}

			{serviceDescription && (
				<div className={styles.desc}>
					<p>{serviceDescription}</p>
				</div>
			)}

			<div className={styles.main}>
				<FormComponent
					ref={formRef}
					phoneEntryBox={phoneEntryBox}
					dialCode={dialCode}
					userInstructions={userInstructions}
					cta={cta}
					clickableZone={clickableZone}
					showModal={showModal}
					setShowModal={setShowModal}
					closableModal={closableModal}
					visitorId={visitorId}
					onSuccess={handleRequestOtp}
				/>

				{exitButton && (
					<Button
						type={"button"}
						label={exitButton}
						className={styles.exitBtn}
						onClick={(e) => {
							e.stopPropagation();
							window.close();
						}}
						size="small"
					/>
				)}
			</div>

			{bottomPriceDescription && (
				<div className={styles.price_wrapper}>
					<p>{bottomPriceDescription}</p>
				</div>
			)}

			{acknowledgment && (
				<div className={styles.acknowledgment_container}>
					<i className={styles.acknowledgment}>{acknowledgment}</i>
				</div>
			)}
		</Layout>
	);
};

export default Landing;
