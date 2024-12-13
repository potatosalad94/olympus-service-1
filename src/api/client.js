import { create } from "apisauce";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = create({
	baseURL: BASE_URL,
});

const serviceInfo = (serviceName) => apiClient.get(`/ServiceInfo?serviceName=${serviceName}`);

const displayData = (body, params) => {
	const paramsList = Object.entries(params)
		.flatMap(([key, value]) => (value ? `${key}=${value}` : undefined))
		.filter(Boolean)
		.join("&");
	return apiClient.post(`/DisplayData?${paramsList}`, body);
};

const changeLanguage = (body) => apiClient.post(`/LanguageChange`, body);

const otpRequest = (body) => apiClient.post(`/OtpRequest`, body);

const resendOtp = (body) => apiClient.post(`/ResendOtp`, body);

const otpConfirm = (body) => apiClient.post(`/OtpConfirm`, body);

export { serviceInfo, displayData, changeLanguage, otpRequest, resendOtp, otpConfirm };
