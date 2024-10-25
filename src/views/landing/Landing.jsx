import ConfirmedSubscription from "@/components/ConfirmedSubscription/ConfirmedSubscription";
import OtpConfirm from "@/components/OtpConfirm/OtpConfirm";
import OtpRequest from "@/components/OtpRequest/OtpRequest";
import useDisplayData from "@/hooks/useDisplayData";
import useStepManagement from "@/hooks/useStepManagement";
import Layout from "@components/Layout/Layout";
import { Button } from "primereact/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.scss";

const serviceName = "Service_1";

const Landing = () => {
	const formRef = useRef(null);
	const navigate = useNavigate();

	const [currentStep, setCurrentStep] = useStepManagement();

	const goToNextStep = (nextStep) => {
		setCurrentStep(nextStep);
		navigate(`?step=${nextStep}`, { replace: true });
	};

	const renderStep = () => {
		switch (currentStep) {
			case "initial":
				return (
					<OtpRequest
						ref={formRef}
						msisdn={msisdn}
						dialCode={dialCode}
						userInstructions={userInstructions}
						cta={cta}
						clickableZone={clickableZone}
						showModal={showModal}
						setShowModal={setShowModal}
						closableModal={closableModal}
						visitorId={visitorId}
						onSuccess={() => goToNextStep("otp")}
						showInput={showMsisdnInput}
						msisdnPrefill={msisdnPrefill}
					/>
				);
			case "otp":
				return (
					<OtpConfirm
						msisdn={msisdn}
						onSuccess={() => goToNextStep("final")} //TODO >> maybe better to redirect to another route for 'confirmation' page
						onBack={() => goToNextStep("initial")}
						visitorId={visitorId}
						alreadySubscribed={alreadySubscribed}
					/>
				);
			case "final":
				//TODO =============================== LAST STEP OF THE FORM ===============================
				return <ConfirmedSubscription msisdn={msisdn} />;
			default:
				return <div>Unknown step</div>;
		}
	};

	// ! =====================================

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

	const step =
		currentStep === "initial"
			? "New Visit"
			: currentStep === "otp"
			? "Otp Request"
			: "Otp Confirm";

	const {
		query: { data: displayData, isFetching },
		storedVisitorId: visitorId,
	} = useDisplayData(
		serviceName,
		step
		// 1 // testResponse
	);

	const { css, content, heRequired, currentLanguage, alreadySubscribed } =
		displayData || {};

	const {
		clickableZone,
		termsV,
		playButton,
		closableModal,
		showMsisdnInput,
		msisdnPrefill,
	} = css ?? {};

	const {
		acknowledgment,
		bottomPriceDescription,
		cta,
		exitButton,
		image,
		imageSteps,
		msisdn,
		dialCode,
		serviceDescription,
		userInstructions,
		termsAndConditions,
		topPriceDescription,
		// newOtpRequest,
		// otpConfirmTimer,
		// popupCta,
		// popupInstructions,
	} = content || {};

	if (isFetching)
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
			step={step}
			onRootClick={() => {
				if (currentStep === "initial") {
					if (showModal) {
						return;
					} else {
						setShowModal(true);
						formRef.current.reset();
					}
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
							currentStep === "initial"
								? playButton
									? (e) => {
											e.stopPropagation();
											handleShowModal();
									  }
									: undefined
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
				{renderStep()}

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
