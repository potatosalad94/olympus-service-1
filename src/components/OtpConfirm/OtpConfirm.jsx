import { otpConfirm, resendOtp as resendOtpEndpoint } from "@/api/client";
import useApi from "@/hooks/useApi";
import useOtpCountdown from "@/hooks/useOtpCountdown";
import { useToastContext } from "@/hooks/useToastContext";
import { errorToast } from "@/utils/toast-messages";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { InputOtp } from "primereact/inputotp";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./OtpConfirm.module.scss";
import otpConfirmSchema from "./otpConfirmSchema";

const OtpConfirm = ({
	onSuccess,
	visitorId,
	onBack,
	msisdn,
	alreadySubscribed,
}) => {
	const { countdown, startCountdown } = useOtpCountdown();

	const handleOtpRequest = () => {
		startCountdown();
		resendOtp(msisdn);
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
		onError: (error) => showToast(errorToast(error)),
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
		onError: (error) => showToast(errorToast(error)),
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

	useEffect(() => {
		if (!!msisdn && alreadySubscribed) {
			onBack();
			showToast(errorToast({ error: { message: "Already subscribed" } }));
		}
	}, [msisdn, alreadySubscribed]);

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
