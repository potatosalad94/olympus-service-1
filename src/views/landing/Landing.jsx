import OtpConfirm from "@/components/OtpConfirm/OtpConfirm";
import OtpRequest from "@/components/OtpRequest/OtpRequest";
import useDisplayData from "@/hooks/useDisplayData";
import Layout from "@components/Layout/Layout";
import { Button } from "primereact/button";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.scss";
import Confirmation from "../confirmation/Confirmation";
import useUrlParams from "@/hooks/useUrlParams";
import { paramConfigs } from "@/utils/param-configs";
import ServiceImage from "@/components/ServiceImage/ServiceImage";
import FullFlow from "@/components/FullFlow";
import CustomStepper from "@/components/CustomStepper/CustomStepper";

const serviceName = "Service_1";

const Landing = () => {
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

	// ! ============== MODAL COMPONENT =======================

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
		}, 1000);

		setTimeoutId(newTimeoutId);
	}, [timeoutId]);

	// ! ======================================================

	const renderStep = () => {
		switch (step) {
			case "initial":
				return (
					<OtpRequest
						showInput={showMsisdnInput}
						showModalInput={showModalMsisdnInput}
						clickableZone={clickableZone}
						msisdnPrefill={msisdnPrefill}
						closableModal={closableModal}
						blurPx={blurPx}
						msisdn={msisdn}
						dialCode={dialCode}
						userInstructions={userInstructions}
						cta={cta}
						modalUserInstructions={modalUserInstructions}
						modalCta={modalCta}
						language={currentLanguage}
						showModal={showModal && modalFlow !== "full"}
						setShowModal={setShowModal}
						visitorId={visitorId}
						onSuccess={() => goToStep("otp")}
					/>
				);
			case "otp":
				return (
					<OtpConfirm
						showInput={showMsisdnInput}
						showModalInput={showModalMsisdnInput}
						showModal={showModal && modalFlow !== "full"}
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
						blurPx={blurPx}
						visitorId={visitorId}
						language={currentLanguage}
					/>
				);

			default:
				break;
		}
	};

	// * ====== NEW VIST CALL ======

	const formattedStep =
		step === "initial" ? "New Visit" : step === "otp" ? "Otp Request" : "Otp Confirm";

	const {
		query: { data: displayData, isFetching },
		isCollecting,
		storedVisitorId: visitorId,
	} = useDisplayData(serviceName, formattedStep, params);

	const {
		css,
		content,
		ctaMethod,
		heRequired,
		currentLanguage,
		alreadySubscribed,
		redirection,
		subscriptionConfirmationPage,
		modalFlow,
	} = displayData || {};

	const {
		clickableZone,
		termsV,
		playButton,
		closableModal,
		showMsisdnInput,
		showModalMsisdnInput,
		msisdnPrefill,
		blurPx,
		skipTopPriceDesc,
		showStepper,
		fullscreenPlayer,
	} = css || {};

	const {
		acknowledgment,
		bottomPriceDescription,
		cta,
		userInstructions,
		modalCta,
		modalUserInstructions,
		exitButton,
		logo,
		image,
		msisdn,
		dialCode,
		serviceDescription,
		termsAndConditions,
		topPriceDescription,
		newOtpRequest,
		otpConfirmTimer,
	} = content || {};

	const handleRootClick = () => {
		if (step === "initial" || step === "otp") {
			if (modalFlow === "full" || modalFlow === "hybrid") {
				setShowModal(true);
			} else {
				return;
			}
		}
	};

	// !==== USE EFFECTS =====
	//* Will redirect to step otp if user already previously entered his phone number && is not subscribed
	useEffect(() => {
		if (modalFlow !== "full" && ctaMethod === "OtpConfirm" && !alreadySubscribed) {
			goToStep("otp");
		}
	}, [modalFlow, alreadySubscribed, ctaMethod, goToStep]);

	useEffect(() => {
		if (
			modalFlow === "full" &&
			!alreadySubscribed &&
			(step === "otp" || ctaMethod === "OtpConfirm")
		) {
			setShowModal(true);
		}
	}, [modalFlow, alreadySubscribed, ctaMethod, step]);

	// const scrollPosition = 50;

	// useEffect(() => {
	// 	// Immediately set the scroll position without animation

	// 	if (isSuccess && !isLoading)
	// 		window.scrollTo({
	// 			top: scrollPosition,
	// 			left: 0,
	// 			behavior: "instant", // This prevents smooth scrolling
	// 		});
	// }, [scrollPosition, isSuccess, isLoading]);

	// TODO >> loading state
	if (isFetching || isCollecting)
		return (
			<div className={styles.loading_container}>
				<i className={`pi pi-spin pi-spinner-dotted ${styles.page_spinner}`}></i>
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
					logo={logo}
					onRootClick={handleRootClick}
					fullscreenPlayer={fullscreenPlayer}
					skipTopPriceDesc={skipTopPriceDesc}
				>
					<CustomStepper currentStep={step === "otp" ? 2 : 1} lang={currentLanguage} />

					<ServiceImage
						playButton={playButton}
						isLoading={isLoading}
						image={image}
						onShowModal={handleShowModal}
						step={step}
						fullscreenPlayer={fullscreenPlayer}
					/>

					{serviceDescription && (
						<div className={styles.desc}>
							<p>{serviceDescription}</p>
						</div>
					)}

					<div className={styles.main}>
						{modalFlow === "full" && (
							<FullFlow
								showModal={showModal}
								setShowModal={setShowModal}
								showModalInput={showModalMsisdnInput}
								clickableZone={clickableZone}
								msisdnPrefill={msisdnPrefill}
								closableModal={closableModal}
								blurPx={blurPx}
								msisdn={msisdn}
								dialCode={dialCode}
								modalUserInstructions={modalUserInstructions}
								modalCta={modalCta}
								language={currentLanguage}
								ctaMethod={ctaMethod}
								visitorId={visitorId}
								onSuccess={() => {
									if (redirection && !subscriptionConfirmationPage) {
										window.location.replace(redirection);
									} else {
										goToStep("final");
									}
								}}
								isLoadingDataDisplay={isFetching}
								newOtpRequest={newOtpRequest}
								otpConfirmTimer={otpConfirmTimer}
							/>
						)}

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
