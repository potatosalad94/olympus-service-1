import { useState, useEffect } from "react";

const OTP_TIME_STAMP = "otpRequestTimestamp";

const useOtpCountdown = (countdownTime = 60) => {
	const [countdown, setCountdown] = useState(0);

	useEffect(() => {
		const storedTimestamp = localStorage.getItem(OTP_TIME_STAMP);
		if (storedTimestamp) {
			const elapsedTime = Math.floor((Date.now() - parseInt(storedTimestamp)) / 1000);
			if (elapsedTime < countdownTime) {
				setCountdown(countdownTime - elapsedTime);
			}
		}
	}, []);

	useEffect(() => {
		let timer;
		if (countdown > 0) {
			timer = setInterval(() => {
				setCountdown((prevCount) => {
					if (prevCount <= 1) {
						clearInterval(timer);
						localStorage.removeItem(OTP_TIME_STAMP);
						return 0;
					}
					return prevCount - 1;
				});
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [countdown]);

	const startCountdown = () => {
		setCountdown(countdownTime);
		localStorage.setItem(OTP_TIME_STAMP, Date.now().toString());
	};

	return { countdown, startCountdown };
};

export default useOtpCountdown;
