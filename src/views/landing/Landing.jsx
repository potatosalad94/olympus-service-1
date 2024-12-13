import OtpConfirm from "@/components/OtpConfirm/OtpConfirm";
import OtpRequest from "@/components/OtpRequest/OtpRequest";
import useDisplayData from "@/hooks/useDisplayData";
import Layout from "@components/Layout/Layout";
import { Button } from "primereact/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.scss";
import CircularProgress from "@/components/CircularProgress/CircularProgress";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import Confirmation from "../confirmation/Confirmation";
import { languages } from "@/utils/languages-dictionnary";
import useUrlParams from "@/hooks/useUrlParams";
import { paramConfigs } from "@/utils/param-configs";

const serviceName = "Service_1";

const Landing = () => {
	// const formRef = useRef(null);
	const navigate = useNavigate();

	const { params, setParams } = useUrlParams(paramConfigs);
	const { step } = params;

	const goToStep = useCallback(
		(nextStep) => {
			setParams({ step: nextStep });
			navigate(`?step=${nextStep}`, { replace: true });
		},
		[navigate]
	);

	const renderStep = () => {
		switch (step) {
			case "initial":
				return (
					<OtpRequest
						// ref={formRef}
						//* CSS
						showInput={showMsisdnInput}
						clickableZone={clickableZone}
						msisdnPrefill={msisdnPrefill}
						closableModal={closableModal}
						//* CONTENT
						msisdn={msisdn}
						dialCode={dialCode}
						userInstructions={userInstructions}
						cta={cta}
						modalUserInstructions={modalUserInstructions}
						modalCta={modalCta}
						language={currentLanguage}
						// *
						showModal={showModal}
						setShowModal={setShowModal}
						visitorId={visitorId}
						onSuccess={() => goToStep("otp")}
					/>
				);
			case "otp":
				return (
					<OtpConfirm
						showModal={showModal}
						setShowModal={setShowModal}
						content={content}
						onSuccess={() => {
							if (redirection && !subscriptionConfirmationPage) {
								window.location.replace(redirection);
							} else {
								goToStep("final");
							}
						}}
						closableModal={closableModal}
						visitorId={visitorId}
						language={currentLanguage}
					/>
				);

			default:
				break;
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
			// formRef.current.reset();
		}, 1000);

		setTimeoutId(newTimeoutId);
	}, [timeoutId]);

	// * ====== NEW VIST CALL ======

	const formattedStep =
		step === "initial" ? "New Visit" : step === "otp" ? "Otp Request" : "Otp Confirm";

	const {
		query: { data: displayData, isFetching },
		isCollecting,
		storedVisitorId: visitorId,
	} = useDisplayData(
		serviceName,
		formattedStep,
		params
		// 1 // testResponse
	);

	const {
		css,
		content,
		ctaMethod,
		heRequired,
		currentLanguage,
		alreadySubscribed,
		redirection,
		subscriptionConfirmationPage,
	} = displayData || {};

	//* Will redirect to step otp if user already previously entered his phone number && is not subscribed
	useEffect(() => {
		if (ctaMethod === "OtpConfirm" && !alreadySubscribed) {
			goToStep("otp");
		}
	}, [alreadySubscribed, ctaMethod, goToStep]);

	const { clickableZone, termsV, playButton, closableModal, showMsisdnInput, msisdnPrefill } =
		css || {};

	const {
		acknowledgment,
		bottomPriceDescription,
		cta,
		userInstructions,
		modalCta,
		modalUserInstructions,
		exitButton,
		image,
		msisdn,
		dialCode,
		serviceDescription,
		termsAndConditions,
		topPriceDescription,
	} = content || {};

	if (isFetching || isCollecting)
		return (
			<div className={styles.loading_container}>
				<i
					className={`pi pi-spin pi-spinner-dotted ${styles.rotating_icon} ${styles.page_spinner}`}
				></i>
			</div>
		);

	if (heRequired) return <div> Should do a HE redirect + call Post HE</div>; //TODO LATER

	return (
		<>
			{step === "final" ? (
				<Confirmation data={displayData} />
			) : (
				<Layout
					headerPrice={topPriceDescription ?? ""}
					terms={termsAndConditions ?? ""}
					termsVisibility={termsV}
					lang={currentLanguage}
					step={formattedStep}
					onRootClick={() => {
						if (step === "initial" || step === "otp") {
							if (showModal) {
								return;
							} else {
								setShowModal(true);
								// formRef.current.reset();
							}
						}
					}}
				>
					<Stepper
						linear={true}
						activeStep={step === "otp" ? 1 : 0}
						pt={{
							panelContainer: {
								style: {
									display: "none",
								},
							},
							...(currentLanguage === languages.arabic && {
								nav: {
									style: {
										flexDirection: "row-reverse",
									},
								},

								stepperpanel: {
									style: {
										flexDirection: "row-reverse",
									},
									className: styles.stepper_panel,

									separator: {
										style: {
											marginInlineStart: 0,
											marginInlineEnd: "1rem",
										},
									},
								},
							}),
						}}
					>
						{/* الخطوة  */}
						<StepperPanel
							header={currentLanguage === languages.arabic ? "الخطوة 1" : "Step 1"}
						></StepperPanel>
						<StepperPanel
							header={currentLanguage === languages.arabic ? "الخطوة 2" : "Step 2"}
						></StepperPanel>
					</Stepper>

					<div className={styles.logo_container}>
						{image ? (
							<Button
								unstyled
								className={styles.image_button}
								onClick={
									step === "initial"
										? playButton
											? (e) => {
													e.stopPropagation();
													handleShowModal();
											  }
											: undefined
										: undefined
								}
							>
								{playButton && !isLoading && <i className="pi pi-play-circle"></i>}
								{isLoading && (
									<i
										className={`pi pi-spin pi-spinner-dotted ${styles.rotating_icon}`}
									></i>
								)}
								<img src={image} alt="" />
							</Button>
						) : (
							<CircularProgress />
						)}
					</div>

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
			)}
		</>
	);
};

export default Landing;
