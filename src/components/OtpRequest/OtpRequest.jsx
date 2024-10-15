import styles from "./OtpRequest.module.scss";
import useOtpCountdown from "@/hooks/useOtpCountdown";
import { Button } from "primereact/button";
import { InputOtp } from "primereact/inputotp";
import { useState } from "react";

const OtpRequest = () => {
	const [token, setTokens] = useState();

	const { countdown, startCountdown } = useOtpCountdown();

	const handleOtpRequest = () => {
		startCountdown();
	};

	return (
		<div className={styles.container}>
			<InputOtp
				value={token}
				onChange={(e) => setTokens(e.value)}
				integerOnly
			/>
			<Button onClick={handleOtpRequest} disabled={countdown > 0} link>
				Request OTP
			</Button>

			<Button>Submit</Button>
			{countdown > 0 && (
				<p>You can request another OTP in {countdown} seconds</p>
			)}
		</div>
	);
};

export default OtpRequest;
