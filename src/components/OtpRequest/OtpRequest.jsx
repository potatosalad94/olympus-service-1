import { otpRequest } from "@/api/client";
import Input from "@/components/Input/Input";
import otpRequestSchema from "@/components/OtpRequest/otpRequestSchema";
import useApi from "@/hooks/useApi";
import { useToastContext } from "@/hooks/useToastContext";
import { errorToast } from "@/utils/toast-messages";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { forwardRef, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./OtpRequest.module.scss";

const OtpRequest = forwardRef(
	(
		{
			msisdn,
			dialCode,
			userInstructions,
			cta,
			clickableZone,
			showModal,
			setShowModal,
			closableModal,
			visitorId,
			onSuccess,
			showInput,
			msisdnPrefill,
		},
		ref
	) => {
		const { showToast } = useToastContext();

		const otpRequestApi = useApi(otpRequest);

		const { mutate: requestOtp, isPending } = useMutation({
			mutationFn: (msisdn = "") => {
				return otpRequestApi.request({
					visitorId,
					msisdn,
				});
			},
			onSuccess,
			onError: ({ errorTitle, error }) =>
				showToast(errorToast(errorTitle, error)),
		});

		const {
			reset,
			control: mainControl,
			handleSubmit: mainHandleSubmit,
			formState: { errors: mainErrors },
		} = useForm({
			resolver: joiResolver(otpRequestSchema),
			context: {
				dialCode,
				showInput,
				// phoneEntryBox
			},
			defaultValues: {
				contact: msisdnPrefill && msisdn ? msisdn : "",
			},
			mode: "onSubmit",
		});

		const {
			control: dialogControl,
			handleSubmit: dialogHandleSubmit,
			formState: { errors: dialogErrors },
		} = useForm({
			resolver: joiResolver(otpRequestSchema),
			context: {
				dialCode,
				showInput,
				// phoneEntryBox
			},
			defaultValues: {
				contact: msisdnPrefill && msisdn ? msisdn : "",
			},
			mode: "onSubmit",
		});

		const onSubmit = ({ contact }) => {
			requestOtp(contact);
		};

		useImperativeHandle(ref, () => ({
			reset,
		}));

		const renderFormContent = (control, errors) => (
			<div className={styles.form_container}>
				{showInput && (
					<>
						{userInstructions && <p>{userInstructions}</p>}
						<Controller
							name="contact"
							control={control}
							render={({ field, fieldState }) => (
								<Input
									{...field}
									dialCode={dialCode}
									error={fieldState.error}
									onClick={(e) => e.stopPropagation()}
								/>
							)}
						/>
					</>
				)}
				<Button
					type="submit"
					label={cta}
					size={clickableZone === "Large" ? "large" : undefined}
					onClick={(e) => {
						e.stopPropagation();
					}}
					loading={isPending}
				/>
			</div>
		);

		return (
			<>
				<form onSubmit={mainHandleSubmit(onSubmit)} noValidate>
					{renderFormContent(mainControl, mainErrors)}
				</form>

				<Dialog
					visible={showModal}
					style={{ width: "70vw" }}
					onHide={() => setShowModal(false)}
					closable={closableModal}
					draggable={false}
					showHeader={closableModal}
					contentClassName={
						!closableModal ? styles.no_header : undefined
					}
				>
					<form onSubmit={dialogHandleSubmit(onSubmit)} noValidate>
						{renderFormContent(dialogControl, dialogErrors)}
					</form>
				</Dialog>
			</>
		);
	}
);

export default OtpRequest;
