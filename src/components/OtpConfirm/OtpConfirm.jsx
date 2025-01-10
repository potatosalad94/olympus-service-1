import { otpConfirm, resendOtp as resendOtpEndpoint } from "@/api/client";
import useApi from "@/hooks/useApi";
import useOtpCountdown from "@/hooks/useOtpCountdown";
import { languages } from "@/utils/languages-dictionnary";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputOtp } from "primereact/inputotp";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./OtpConfirm.module.scss";
import otpConfirmSchema from "./otpConfirmSchema";

const OtpConfirm = ({
	onSuccess,
	visitorId,
	content,
	language,
	showModal,
	setShowModal,
	closableModal,
	blurPx,
	showInput,
	showModalInput,
}) => {
	const [otpState, setOtpState] = useState("");

	const {
		msisdn,
		userInstructions,
		cta,
		modalCta,
		modalUserInstructions,
		newOtpRequest,
		otpConfirmTimer,
	} = content || {};

	const { countdown, startCountdown } = useOtpCountdown(otpConfirmTimer);

	const handleOtpRequest = () => {
		resendOtp(msisdn);
	};

	// * ==== OTP CONFIRM =====
	const otpConfirmApi = useApi(otpConfirm);

	const { mutate: confirmOtp, isPending } = useMutation({
		mutationFn: (otp) => {
			return otpConfirmApi.request({
				visitorId,
				otp,
			});
		},
		onSuccess,
		onError: () => reset(),
	});

	// * ==== RESEND OTP =====

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

	// * =================

	const {
		control,
		handleSubmit,
		reset,
		setValue,
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

	const onSubmit = ({ otp }) => {
		confirmOtp(otp);
	};

	const renderFormContent = (isModal = false) => (
		<div className={styles.container}>
			{!isModal && userInstructions && <p>{userInstructions}</p>}
			{isModal && modalUserInstructions && <p>{modalUserInstructions}</p>}

			<Controller
				name="otp"
				control={control}
				render={({ field }) => (
					<InputOtp
						{...field}
						onChange={(e) => {
							const newValue = e.value;
							setOtpState(newValue);
							setValue("otp", newValue);
						}}
						integerOnly
						// error={fieldState.error} //TODO >> ajouter ?
					/>
				)}
			/>

			{((isModal && modalCta) || (!isModal && cta)) && (
				<>
					<Button
						loading={isPending}
						className={styles.cta_btn}
						disabled={otpWatcher.length !== 4}
						label={isModal ? modalCta : cta}
					></Button>

					<Button
						type={"button"}
						className={styles.cta_btn}
						onClick={handleOtpRequest}
						disabled={countdown > 0}
						link
					>
						{newOtpRequest}
					</Button>
				</>
			)}

			{countdown > 0 && (
				<p>
					{language === languages.arabic
						? `يمكنك طلب رمز التحقق مرة أخرى بعد ${countdown} ثانية`
						: `You can request another OTP in ${countdown} seconds`}
				</p>
			)}
		</div>
	);

	return (
		<>
			{(showInput || cta) && (
				<form onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()}>
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

export default OtpConfirm;
