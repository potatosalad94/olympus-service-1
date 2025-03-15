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
import useTheme from "@/hooks/useTheme";
import { useScrollToElement } from "@/hooks/useScrollToElement";

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
						css={css}
						content={content}
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
						css={css}
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
		step === "initial"
			? "New Visit"
			: step === "otp"
			? "Otp Request"
			: "Otp Confirm";

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
		availableLanguages,
		alreadySubscribed,
		redirection,
		subscriptionConfirmationPage,
		modalFlow,
	} = displayData || {};

	const {
		playButton,
		showStepper,
		fullscreenPlayer,
		primaryColor,
		skipTopPriceDesc,
		bottomPriceDescFontColor,
		bottomPriceDescFontSize,
		bottomPriceDescFontStyle,
		bottomPriceDescFontWeight,
		pageBackgroundColor,
	} = css || {};

	useTheme(primaryColor, pageBackgroundColor);

	const {
		acknowledgment,
		bottomPriceDescription,
		exitButton,
		logo,
		image,
		serviceDescription,
		termsAndConditions,
		topPriceDescription,
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
		if (
			modalFlow !== "full" &&
			ctaMethod === "OtpConfirm" &&
			!alreadySubscribed
		) {
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

	const [imgLoaded, setImgLoaded] = useState(false);
	const divRef = useScrollToElement(skipTopPriceDesc && imgLoaded);

	if (isFetching || isCollecting)
		return (
			<div className={styles.loading_container}>
				<i
					className={`pi pi-spin pi-spinner-dotted ${styles.page_spinner}`}
				></i>
			</div>
		);

	if (heRequired) return <div>HE REDIRECT</div>; //TODO LATER

	return (
		<>
			{step === "final" ? (
				<Confirmation data={displayData} />
			) : (
				<Layout
					headerPrice={topPriceDescription ?? ""}
					terms={termsAndConditions}
					lang={currentLanguage}
					availableLanguages={availableLanguages}
					step={formattedStep}
					logo={logo}
					onRootClick={handleRootClick}
					css={css}
				>
					<div ref={divRef}>
						{showStepper && (
							<CustomStepper
								currentStep={step === "otp" ? 2 : 1}
								lang={currentLanguage}
							/>
						)}

						<ServiceImage
							playButton={playButton}
							isLoading={isLoading}
							image={image}
							onShowModal={handleShowModal}
							step={step}
							fullscreenPlayer={fullscreenPlayer}
							primaryColor={primaryColor}
							onLoad={() => setImgLoaded(true)}
						/>

						{serviceDescription && (
							<div className={styles.desc}>
								<p>{serviceDescription}</p>
							</div>
						)}

						<div className={styles.main}>
							{modalFlow === "full" && (
								<FullFlow
									content={content}
									showModal={showModal}
									setShowModal={setShowModal}
									css={css}
									language={currentLanguage}
									ctaMethod={ctaMethod}
									visitorId={visitorId}
									onSuccess={() => {
										if (
											redirection &&
											!subscriptionConfirmationPage
										) {
											window.location.replace(
												redirection
											);
										} else {
											goToStep("final");
										}
									}}
									isLoadingDataDisplay={isFetching}
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
								<p
									style={{
										color: bottomPriceDescFontColor,
										fontSize: bottomPriceDescFontSize,
										fontStyle: bottomPriceDescFontStyle,
										fontWeight: bottomPriceDescFontWeight,
									}}
								>
									{bottomPriceDescription}
								</p>
							</div>
						)}

						{acknowledgment && (
							<div className={styles.acknowledgment_container}>
								<i className={styles.acknowledgment}>
									{acknowledgment}
								</i>
							</div>
						)}
					</div>
				</Layout>
			)}
		</>
	);
};

export default Landing;
