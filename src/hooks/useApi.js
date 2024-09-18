const useApi = (apiFunc) => {
	const request = async (...args) => {
		const response = await apiFunc(...args);

		if (!response.ok) throw response.data;
		return response;
	};

	return { request };
};

export default useApi;
