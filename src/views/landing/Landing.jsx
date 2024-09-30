import Input from "@/components/Input/Input";
import useNewVisit from "@/hooks/useNewVisit";
import Layout from "@components/Layout/Layout";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import styles from "./Landing.module.scss";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const serviceName = "Service_1";

const formSchema = Joi.object({
	contact: Joi.string()
		.when(Joi.ref("$phoneEntryBox"), {
			is: null,
			then: Joi.optional(),
			otherwise: Joi.string()
				.required()
				.custom((value, helpers) => {
					const { phoneEntryBox } = helpers.prefs.context;
					const numericValue = value.replace(/\s/g, ""); // Remove spaces, but keep as string

					if (!/^\d+$/.test(numericValue)) {
						return helpers.error("number.base");
					}

					const regex = new RegExp(`^${phoneEntryBox}\\d{8}$`);

					if (!regex.test(numericValue)) {
						return helpers.error("string.pattern.base");
					}

					return numericValue; // Return original value without spaces
				})
				.messages({
					"string.empty": "Phone number can't be empty",
					"number.base": "Phone number must contain only numbers",
					"string.pattern.base": "Phone number format is invalid",
				}),
		})
		.label("Phone number"),
});

const Landing = () => {
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

	// * ====== NEW VIST CALL ======

	const { data: newVisitData, isFetching: isFetchingNewVisit } = useNewVisit(
		serviceName,
		true
		// 1 // testResponse
	);

	const { css, content, msisdn, heRequired, currentLanguage } =
		newVisitData || {};

	const { clickableZone, termsV, playButton, closableModal } = css ?? {};

	const {
		acknowledgment,
		bottomPriceDescription,
		cta,
		exitButton,
		image,
		imageSteps,
		phoneEntryBox,
		serviceDescription,
		termsAndConditions,
		topPriceDescription,
		userInstructions,
		// newOtpRequest,
		// otpConfirmTimer,
		// popupCta,
		// popupInstructions,
	} = content || {};

	// * react-hook-form

	const {
		formState: { errors },
		handleSubmit,
		control,
		watch,
	} = useForm({
		resolver: joiResolver(formSchema),
		mode: "onSubmit",
		context: { phoneEntryBox }, // Pass phoneEntryBox as context
	});

	// console.log("🚀 ~ errors >>", errors);

	const handleCtaClick = (data) => {
		console.log("THE DATA >>", data);
	};

	// * ===========================

	if (isFetchingNewVisit) return "Loading"; //TODO >> better loading spinner / skeleton to implement

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

					{/* <button
						// role={"button"}
						// tabIndex={0}
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
					</button> */}
				</div>
			)}

			{serviceDescription && (
				<div className={styles.desc}>
					<p>{serviceDescription}</p>
				</div>
			)}

			<div className={styles.main}>
				<form
					onSubmit={handleSubmit((data) => handleCtaClick(data))}
					noValidate
				>
					{phoneEntryBox && (
						<>
							{userInstructions && <p>{userInstructions}</p>}

							<Controller
								name="contact"
								control={control}
								defaultValue=""
								// rules={{ required: 'Phone number is required' }}
								render={({ field, fieldState }) => (
									<Input
										{...field}
										defaultValue={phoneEntryBox}
										error={fieldState.error}
										onClick={(e) => e.stopPropagation()}
									/>
								)}
							/>

							{/* <Input
								defaultValue={phoneEntryBox}
								value={""} // TODO
								onClick={(e) => {
									e.stopPropagation();
									// alert("INPUT CLICK");
								}}
								onChange={""} // TODO
								error={errors.contact}
							/> */}
						</>
					)}

					<Button
						label={cta}
						size={clickableZone === "Large" ? "large" : undefined}
						onClick={(e) => {
							e.stopPropagation();
							alert("clicked CTA"); //TODO >> to be handled by react-hook-form
						}}
					/>
				</form>
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

			<Dialog
				visible={showModal}
				style={{ width: "70vw" }}
				onHide={() => {
					if (!showModal) return;
					setShowModal(false);
				}}
				closable={closableModal}
				draggable={false}
				showHeader={closableModal}
				contentClassName={!closableModal ? styles.no_header : undefined}
			>
				<div>
					blabla
					{/* //TODO >> add userInstructions + phoneEntryBox + cta */}
				</div>
			</Dialog>
		</Layout>
	);
};

export default Landing;
