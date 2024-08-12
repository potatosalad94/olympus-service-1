import { create } from "apisauce";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = create({
	baseURL: BASE_URL,
});

export default apiClient;
