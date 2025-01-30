import { otpConfirm, otpRequest, resendOtp as resendOtpEndpoint } from "@/api/client";
import Input from "@/components/Input/Input";
import otpConfirmSchema from "@/components/OtpConfirm/otpConfirmSchema";
import otpRequestSchema from "@/components/OtpRequest/otpRequestSchema";
import useApi from "@/hooks/useApi";
import useOtpCountdown from "@/hooks/useOtpCountdown";
import { languages } from "@/utils/languages-dictionnary";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputOtp } from "primereact/inputotp";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./FullFlow.module.scss";
import { classNames } from "primereact/utils";

const FullFlow = ({
	content,
	css,
	showModal,
	setShowModal,
	language,
	ctaMethod,
	visitorId,
	onSuccess,
	isLoadingDataDisplay,
}) => {
	const {
		showModalMsisdnInput,
		clickableZone,
		msisdnPrefill,
		closableModal,
		blurPx,
		modalCtaFontColor,
		modalCtaFontSize,
		modalCtaFontStyle,
		modalCtaFontWeight,
		modalCtaInfoFontColor,
		modalCtaInfoFontSize,
		modalCtaInfoFontStyle,
		modalCtaInfoFontWeight,
	} = css;

	const {
		msisdn,
		dialCode,
		modalUserInstructions,
		modalCta,
		modalCtaInfo,
		modalCtaSecondStep,
		newOtpRequest,
		otpConfirmTimer,
	} = content;

	const [modalStep, setModalStep] = useState(ctaMethod);

	const otpRequestApi = useApi(otpRequest);
	const [disabled, setDisabled] = useState(
		showModalMsisdnInput ? (msisdn?.length === 10 ? false : true) : false
	);

	const [contactValue, setContactValue] = useState(msisdnPrefill && msisdn ? msisdn : "");

	useEffect(() => {
		if (showModalMsisdnInput) {
			if (contactValue.match(/\d/g)?.length === 10) {
				setDisabled(false);
			} else {
				setDisabled(true);
			}
		}
	}, [contactValue, showModalMsisdnInput]);

	// * ==== RESEND OTP =====
	const { countdown, startCountdown } = useOtpCountdown(otpConfirmTimer);

	const resendOtpApi = useApi(resendOtpEndpoint);

	const { mutate: resendOtp, isPending: isPendingOtp } = useMutation({
		mutationFn: (msisdn) => {
			return resendOtpApi.request({
				visitorId,
				msisdn,
			});
		},
		onSuccess: () => startCountdown(),
	});

	// * ==== OTP CONFIRM =====

	const [otpState, setOtpState] = useState("");

	const {
		control: controlOtp,
		handleSubmit: handleConfirmOtp,
		reset: resetOtpForm,
		setValue: setValueOtp,
		// formState: { errors },
		watch,
	} = useForm({
		resolver: joiResolver(otpConfirmSchema),
		mode: "onSubmit",
		defaultValues: {
			otp: otpState,
		},
	});

	const otpWatcher = watch("otp");

	const otpConfirmApi = useApi(otpConfirm);

	const {
		mutate: confirmOtp,
		isPending: isPendingConfirm,
		isError,
	} = useMutation({
		mutationFn: (otp) => {
			return otpConfirmApi.request({
				visitorId,
				otp,
			});
		},
		onSuccess,
		onError: () => resetOtpForm(),
	});

	const onSubmitOtpConfirm = ({ otp }) => {
		confirmOtp(otp);
	};

	// * ==== OTP REQUEST =====

	const { mutate: requestOtp, isPending } = useMutation({
		mutationFn: (msisdn = "") => {
			return otpRequestApi.request({
				visitorId,
				msisdn,
			});
		},
		onSuccess: () => {
			setModalStep("OtpConfirm");
		},
	});

	const { control, handleSubmit, setValue } = useForm({
		resolver: joiResolver(otpRequestSchema(language?.code?.toLowerCase())),
		context: {
			dialCode,
			showInput: showModalMsisdnInput,
		},
		defaultValues: {
			contact: contactValue,
		},
		mode: "onSubmit",
	});

	const onSubmitOtpRequest = ({ contact }) => {
		requestOtp(contact);
	};

	const renderOtpRequestFormContent = () => (
		<div className={styles.form_container}>
			{modalUserInstructions && <p>{modalUserInstructions}</p>}

			{showModalMsisdnInput && (
				<div className={styles.input_wrapper}>
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
				</div>
			)}

			{modalCta && (
				<Button
					type="submit"
					size={clickableZone === "Large" ? "large" : undefined}
					disabled={disabled}
					onClick={(e) => {
						e.stopPropagation();
					}}
					className={styles.submit_btn}
				>
					{isPending ? (
						<i className={`pi pi-spin pi-spinner-dotted`}></i>
					) : (
						<>
							<span
								style={{
									color: modalCtaFontColor,
									fontSize: modalCtaFontSize,
									fontStyle: modalCtaFontStyle,
									fontWeight: modalCtaFontWeight,
								}}
							>
								{modalCta}
							</span>
							<span
								style={{
									color: modalCtaInfoFontColor,
									fontSize: modalCtaInfoFontSize,
									fontStyle: modalCtaInfoFontStyle,
									fontWeight: modalCtaInfoFontWeight,
								}}
							>
								{modalCtaInfo}
							</span>
						</>
					)}
				</Button>
			)}
		</div>
	);

	const renderOtpConfirmFormContent = () => (
		<div className={styles.form_container}>
			{modalUserInstructions && <p>{modalUserInstructions}</p>}

			<Controller
				name="otp"
				control={controlOtp}
				render={({ field }) => (
					<InputOtp
						{...field}
						pt={{
							root: {
								className: classNames(styles["custom-otp-input"], {
									[styles.error]: isError,
								}),
							},
						}}
						onChange={(e) => {
							const newValue = e.value;
							setOtpState(newValue);
							setValueOtp("otp", newValue);
						}}
						integerOnly
						// error={fieldState.error} //TODO >> ajouter ?
					/>
				)}
			/>

			<Button className={styles.submit_btn} disabled={otpWatcher.length !== 4}>
				{isPendingConfirm ? (
					<i className={`pi pi-spin pi-spinner-dotted`}></i>
				) : (
					<span
						style={{
							color: modalCtaFontColor,
							fontSize: modalCtaFontSize,
							fontStyle: modalCtaFontStyle,
							fontWeight: modalCtaFontWeight,
						}}
					>
						{modalCtaSecondStep}
					</span>
				)}
			</Button>

			<Button
				type={"button"}
				className={styles.resend_btn}
				onClick={() => resendOtp(contactValue)}
				disabled={countdown > 0 || isPendingOtp || isPendingConfirm || isLoadingDataDisplay}
				link
			>
				{newOtpRequest}
			</Button>

			{countdown > 0 && (
				<p>
					{language?.code === languages.arabic
						? `يمكنك طلب رمز التحقق مرة أخرى بعد ${countdown} ثانية`
						: `You can request another OTP in ${countdown} seconds`}
				</p>
			)}
		</div>
	);

	return (
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
				onHide={() => {
					setShowModal(false);
				}}
				closable={closableModal}
				draggable={false}
				showHeader={closableModal}
				contentClassName={classNames(styles.dialog_content, {
					[styles.no_header]: !closableModal,
				})}
			>
				{modalStep === "OtpRequest" && (
					<form onSubmit={handleSubmit(onSubmitOtpRequest)} noValidate>
						{renderOtpRequestFormContent()}
					</form>
				)}

				{modalStep === "OtpConfirm" && (
					<form onSubmit={handleConfirmOtp(onSubmitOtpConfirm)} noValidate>
						{renderOtpConfirmFormContent()}
					</form>
				)}
			</Dialog>
		</div>
	);
};

export default FullFlow;
