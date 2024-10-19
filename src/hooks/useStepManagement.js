import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useStepManagement = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// Function to get the initial step from URL
	const getInitialStep = () => {
		const urlParams = new URLSearchParams(location.search);
		const stepFromUrl = urlParams.get("step");
		return ["initial", "otp", "final"].includes(stepFromUrl)
			? stepFromUrl
			: "initial";
	};

	const [currentStep, setCurrentStep] = useState(getInitialStep);

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const stepFromUrl = urlParams.get("step");

		if (stepFromUrl && ["initial", "otp", "final"].includes(stepFromUrl)) {
			setCurrentStep(stepFromUrl);
		} else {
			navigate("?step=initial", { replace: true });
		}
	}, [navigate, location]);

	return [currentStep, setCurrentStep];
};

export default useStepManagement;
