import { otpRequest } from "@/api/client";
import Input from "@/components/Input/Input";
import otpRequestSchema from "@/components/OtpRequest/otpRequestSchema";
import useApi from "@/hooks/useApi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./OtpRequest.module.scss";

const OtpRequest = ({ css, content, showModal, setShowModal, visitorId, onSuccess, language }) => {
	const { msisdn, dialCode, userInstructions, cta, ctaInfo, modalUserInstructions, modalCta } =
		content;

	const {
		closableModal,
		clickableZone,
		showMsisdnInput,
		showModalMsisdnInput,
		msisdnPrefill,
		blurPx,

		ctaFontColor,
		ctaFontSize,
		ctaFontStyle,
		ctaFontWeight,

		ctaInfoFontColor,
		ctaInfoFontSize,
		ctaInfoFontStyle,
		ctaInfoFontWeight,
	} = css;

	const otpRequestApi = useApi(otpRequest);

	const showInput = (!showModal && showMsisdnInput) || (showModal && showModalMsisdnInput);

	const [disabled, setDisabled] = useState(
		showInput ? (msisdn?.length === 10 ? false : true) : false
	);

	// Add a state to manage the contact value separately
	const [contactValue, setContactValue] = useState(msisdnPrefill && msisdn ? msisdn : "");

	useEffect(() => {
		if (showInput) {
			if (contactValue.match(/\d/g)?.length === 10) {
				setDisabled(false);
			} else {
				setDisabled(true);
			}
		}
	}, [contactValue, showInput]);

	const { mutate: requestOtp, isPending } = useMutation({
		mutationFn: (msisdn = "") => {
			return otpRequestApi.request({
				visitorId,
				msisdn,
			});
		},
		onSuccess,
	});

	const { control, handleSubmit, setValue } = useForm({
		resolver: joiResolver(otpRequestSchema(language?.code?.toLowerCase())),
		context: {
			dialCode,
			showInput: showInput,
		},
		defaultValues: {
			contact: contactValue,
		},
		mode: "onSubmit",
	});

	const onSubmit = ({ contact }) => {
		requestOtp(contact);
	};

	// useImperativeHandle(ref, () => ({
	// 	reset: () => {
	// 		reset();
	// 		setContactValue("");
	// 	},
	// }));

	const renderFormContent = (isModal = false) => (
		<div className={styles.form_container}>
			{!isModal && userInstructions && <p>{userInstructions}</p>}
			{isModal && modalUserInstructions && <p>{modalUserInstructions}</p>}

			{showInput && (
				<Controller
					name="contact"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							{...field}
							value={contactValue}
							onChange={(e) => {
								const newValue = e.target.value;
								setContactValue(newValue);
								setValue("contact", newValue);
							}}
							dialCode={dialCode}
							error={fieldState.error}
							onClick={(e) => e.stopPropagation()}
							type="tel"
							disabled={disabled}
						/>
					)}
				/>
			)}

			{((isModal && modalCta) || (!isModal && cta)) && (
				<Button
					type="submit"
					size={clickableZone === "Large" ? "large" : undefined}
					onClick={(e) => {
						e.stopPropagation();
					}}
					className={styles.submit_btn}
					disabled={disabled}
				>
					{isPending ? (
						<i className={`pi pi-spin pi-spinner-dotted`}></i>
					) : (
						<>
							<span
								style={{
									color: ctaFontColor,
									fontSize: ctaFontSize,
									fontStyle: ctaFontStyle,
									fontWeight: ctaFontWeight,
								}}
							>
								{isModal ? modalCta : cta}
							</span>
							<span
								style={{
									color: ctaInfoFontColor,
									fontSize: ctaInfoFontSize,
									fontStyle: ctaInfoFontStyle,
									fontWeight: ctaInfoFontWeight,
								}}
							>
								{ctaInfo}
							</span>
						</>
					)}
				</Button>
			)}
		</div>
	);

	return (
		<>
			{(showMsisdnInput || cta) && (
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					{renderFormContent()}
				</form>
			)}

			<div onClick={(e) => e.stopPropagation()}>
				<Dialog
					pt={{
						mask: {
							style: {
								backdropFilter: `blur(${blurPx}px)`,
							},
						},
					}}
					focusOnShow={false}
					visible={showModal}
					maskStyle={{ padding: "20px" }}
					blockScroll={true}
					className={styles.dialog_container}
					onHide={() => {
						setShowModal(false);
					}}
					closable={closableModal}
					draggable={false}
					showHeader={closableModal}
					contentClassName={!closableModal ? styles.no_header : undefined}
				>
					<form onSubmit={handleSubmit(onSubmit)} noValidate>
						{renderFormContent(showModal)}
					</form>
				</Dialog>
			</div>
		</>
	);
};

export default OtpRequest;
