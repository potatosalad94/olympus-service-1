import { otpRequest } from "@/api/client";
import Input from "@/components/Input/Input";
import otpRequestSchema from "@/components/OtpRequest/otpRequestSchema";
import useApi from "@/hooks/useApi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./OtpRequest.module.scss";

const OtpRequest = ({
	msisdn,
	dialCode,
	userInstructions,
	cta,
	modalUserInstructions,
	modalCta,
	clickableZone,
	showModal,
	setShowModal,
	closableModal,
	visitorId,
	onSuccess,
	showInput,
	showModalInput,
	msisdnPrefill,
	language,
	blurPx,
}) => {
	const otpRequestApi = useApi(otpRequest);

	// Add a state to manage the contact value separately
	const [contactValue, setContactValue] = useState(msisdnPrefill && msisdn ? msisdn : "");

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
		resolver: joiResolver(otpRequestSchema(language?.toLowerCase())),
		context: {
			dialCode,
			showInput: showInput || showModalInput,
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

			{(showInput || showModalInput) && (
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
						/>
					)}
				/>
			)}

			{((isModal && modalCta) || (!isModal && cta)) && (
				<Button
					type="submit"
					label={isModal ? modalCta : cta}
					size={clickableZone === "Large" ? "large" : undefined}
					onClick={(e) => {
						e.stopPropagation();
					}}
					loading={isPending}
					className={styles.submit_btn}
				/>
			)}
		</div>
	);

	return (
		<>
			{(showInput || cta) && (
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
					visible={showModal} //TODO >> ajouter aussi modalFlow !== "full" ?
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
