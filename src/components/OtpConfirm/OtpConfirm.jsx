import { otpConfirm, resendOtp as resendOtpEndpoint } from "@/api/client";
import useApi from "@/hooks/useApi";
import useOtpCountdown from "@/hooks/useOtpCountdown";
import { useToastContext } from "@/hooks/useToastContext";
import { errorToast } from "@/utils/toast-messages";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { InputOtp } from "primereact/inputotp";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import styles from "./OtpConfirm.module.scss";
import otpConfirmSchema from "./otpConfirmSchema";

const OtpConfirm = ({ onSuccess, visitorId }) => {
	const [savedPhone, _] = useState(() => sessionStorage.getItem("msisdn"));

	const { countdown, startCountdown } = useOtpCountdown();

	const handleOtpRequest = () => {
		startCountdown();
		resendOtp(savedPhone);
	};

	const { showToast } = useToastContext();

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
		onError: ({ errorTitle, error }) =>
			showToast(errorToast(errorTitle, error)),
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
		onSuccess,
		onError: ({ errorTitle, error }) =>
			showToast(errorToast(errorTitle, error)),
	});

	const {
		control,
		handleSubmit,
		// formState: { errors },
		watch,
	} = useForm({
		resolver: joiResolver(otpConfirmSchema),
		mode: "onSubmit",
		defaultValues: {
			otp: "",
		},
	});

	const otpWatcher = watch("otp");

	// console.log("🚀 ~ errors in otp confirm >>", errors);

	const onSubmit = ({ otp }) => {
		confirmOtp(otp);
	};

	if (!savedPhone) return redirect("/");

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
			<Controller
				name="otp"
				control={control}
				render={({ field: { onChange, ...field } }) => (
					<InputOtp
						{...field}
						onChange={(e) => onChange(e.value)}
						integerOnly
					/>
				)}
			/>

			<Button
				type={"button"}
				onClick={handleOtpRequest}
				disabled={countdown > 0}
				link
			>
				Resend OTP
			</Button>

			<Button loading={isPending} disabled={otpWatcher.length !== 4}>
				Submit
			</Button>
			{countdown > 0 && (
				<p>You can request another OTP in {countdown} seconds</p>
			)}
		</form>
	);
};

export default OtpConfirm;
