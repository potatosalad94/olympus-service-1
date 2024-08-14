import { create } from "apisauce";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = create({
	baseURL: BASE_URL,
});

// const serviceInfo = (body) => apiClient.get(`/ServiceInfo/`, body);

const serviceInfo = (serviceName, language) =>
	apiClient.get(
		`/ServiceInfo?serviceName=${serviceName}&language=${language}`
	);

const newVisit = (body) => apiClient.post(`/NewVisit`, body);

export { serviceInfo, newVisit };

// export default apiClient;
