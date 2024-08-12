import { useState } from "react";

const useApi = (apiFunc) => {
	// states
	// const [data, setData] = useState({});
	// const [error, setError] = useState(false);
	// const [loading, setLoading] = useState(false);
	// const [responseCode, setResponseCode] = useState(0);

	// functions
	const request = async (...args) => {
		// setLoading(true);
		const response = await apiFunc(...args);
		// setLoading(false);

		if (!response.ok) throw response.data;
		return response;

		// setError(!response.ok);
		// setResponseCode(response.status);
		// setData(response.data);
	};

	return { request };
	// return { data, error, loading, request, responseCode };
};

export default useApi;
