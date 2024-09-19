import { create } from "apisauce";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = create({
	baseURL: BASE_URL,
});

const serviceInfo = (serviceName) =>
	apiClient.get(`/ServiceInfo?serviceName=${serviceName}`);

const newVisit = (body) => apiClient.post(`/NewVisit`, body);

export { serviceInfo, newVisit };
