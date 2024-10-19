import { create } from "apisauce";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = create({
	baseURL: BASE_URL,
});

const serviceInfo = (serviceName) =>
	apiClient.get(`/ServiceInfo?serviceName=${serviceName}`);

const displayData = (body) => apiClient.post(`/DisplayData`, body);

const changeLanguage = (body) => apiClient.post(`/LanguageChange`, body);

const otpRequest = (body) => apiClient.post(`/OtpRequest`, body);

export { serviceInfo, displayData, changeLanguage, otpRequest };
