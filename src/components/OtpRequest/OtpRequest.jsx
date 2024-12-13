// import { otpRequest } from "@/api/client";
// import Input from "@/components/Input/Input";
// import otpRequestSchema from "@/components/OtpRequest/otpRequestSchema";
// import useApi from "@/hooks/useApi";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { useMutation } from "@tanstack/react-query";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
// import { Controller, useForm } from "react-hook-form";
// import styles from "./OtpRequest.module.scss";

// const OtpRequest = forwardRef(
// 	(
// 		{
// 			msisdn,
// 			dialCode,
// 			userInstructions,
// 			cta,
// 			modalUserInstructions,
// 			modalCta,
// 			clickableZone,
// 			showModal,
// 			setShowModal,
// 			closableModal,
// 			visitorId,
// 			onSuccess,
// 			showInput,
// 			msisdnPrefill,
// 			language,
// 		},
// 		ref
// 	) => {
// 		const otpRequestApi = useApi(otpRequest);

// 		const { mutate: requestOtp, isPending } = useMutation({
// 			mutationFn: (msisdn = "") => {
// 				return otpRequestApi.request({
// 					visitorId,
// 					msisdn,
// 				});
// 			},
// 			onSuccess,
// 		});

// 		const {
// 			reset,
// 			control: mainControl,
// 			handleSubmit: mainHandleSubmit,
// 			formState: { errors: mainErrors },
// 			trigger: triggerMain,
// 		} = useForm({
// 			resolver: joiResolver(otpRequestSchema(language?.toLowerCase())),
// 			context: {
// 				dialCode,
// 				showInput,
// 			},
// 			defaultValues: {
// 				contact: msisdnPrefill && msisdn ? msisdn : "",
// 			},
// 			mode: "onSubmit",
// 		});

// 		const {
// 			control: dialogControl,
// 			handleSubmit: dialogHandleSubmit,
// 			formState: { errors: dialogErrors },
// 			trigger: triggerDialog,
// 		} = useForm({
// 			resolver: joiResolver(otpRequestSchema(language?.toLowerCase())),
// 			context: {
// 				dialCode,
// 				showInput,
// 			},
// 			defaultValues: {
// 				contact: msisdnPrefill && msisdn ? msisdn : "",
// 			},
// 			mode: "onSubmit",
// 		});

// 		const didMountRef = useRef(false);

// 		useEffect(() => {
// 			if (didMountRef.current) {
// 				Object.keys(mainErrors).length > 0 && triggerMain();
// 				Object.keys(dialogErrors).length > 0 && triggerDialog();
// 			}
// 			didMountRef.current = true;
// 		}, [language]);

// 		const onSubmit = ({ contact }) => {
// 			requestOtp(contact);
// 		};

// 		useImperativeHandle(ref, () => ({
// 			reset,
// 		}));

// 		const renderFormContent = (control, errors, isModal = false) => (
// 			<div className={styles.form_container}>
// 				{showInput && (
// 					<>
// 						{userInstructions && !isModal && <p>{userInstructions}</p>}
// 						{modalUserInstructions && isModal && <p>{modalUserInstructions}</p>}

// 						<Controller
// 							name="contact"
// 							control={control}
// 							render={({ field, fieldState }) => (
// 								<Input
// 									{...field}
// 									dialCode={dialCode}
// 									error={fieldState.error}
// 									onClick={(e) => e.stopPropagation()}
// 									type="tel"
// 								/>
// 							)}
// 						/>
// 					</>
// 				)}
// 				<Button
// 					type="submit"
// 					label={isModal ? modalCta : cta}
// 					size={clickableZone === "Large" ? "large" : undefined}
// 					onClick={(e) => {
// 						e.stopPropagation();
// 					}}
// 					loading={isPending}
// 					className={styles.submit_btn}
// 				/>
// 			</div>
// 		);

// 		return (
// 			<>
// 				<form onSubmit={mainHandleSubmit(onSubmit)} noValidate>
// 					{renderFormContent(mainControl, mainErrors)}
// 				</form>

// 				<div onClick={(e) => e.stopPropagation()}>
// 					<Dialog
// 						focusOnShow={false}
// 						visible={showModal}
// 						maskStyle={{ padding: "20px" }}
// 						blockScroll={true}
// 						className={styles.dialog_container}
// 						onHide={() => {
// 							setShowModal(false);
// 						}}
// 						closable={closableModal}
// 						draggable={false}
// 						showHeader={closableModal}
// 						contentClassName={!closableModal ? styles.no_header : undefined}
// 					>
// 						<form onSubmit={dialogHandleSubmit(onSubmit)} noValidate>
// 							{renderFormContent(dialogControl, dialogErrors, true)}
// 						</form>
// 					</Dialog>
// 				</div>
// 			</>
// 		);
// 	}
// );

// export default OtpRequest;

import { otpRequest } from "@/api/client";
import Input from "@/components/Input/Input";
import otpRequestSchema from "@/components/OtpRequest/otpRequestSchema";
import useApi from "@/hooks/useApi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./OtpRequest.module.scss";

const OtpRequest = forwardRef(
	(
		{
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
			msisdnPrefill,
			language,
		},
		ref
	) => {
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

		const { reset, control, handleSubmit, setValue } = useForm({
			resolver: joiResolver(otpRequestSchema(language?.toLowerCase())),
			context: {
				dialCode,
				showInput,
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
				{showInput && (
					<>
						{!isModal && userInstructions && <p>{userInstructions}</p>}
						{isModal && modalUserInstructions && <p>{modalUserInstructions}</p>}

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
										setValue(
											"contact",
											newValue
											//     {
											// 	shouldValidate: true,
											// }
										);
									}}
									dialCode={dialCode}
									error={fieldState.error}
									onClick={(e) => e.stopPropagation()}
									type="tel"
								/>
							)}
						/>
					</>
				)}
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
			</div>
		);

		return (
			<>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					{renderFormContent()}
				</form>

				<div onClick={(e) => e.stopPropagation()}>
					<Dialog
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
							{renderFormContent(true)}
						</form>
					</Dialog>
				</div>
			</>
		);
	}
);

export default OtpRequest;
