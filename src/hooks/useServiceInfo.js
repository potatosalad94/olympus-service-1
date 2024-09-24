import { serviceInfo } from "@/api/client";
import useApi from "./useApi";
import { queryKeys } from "@/app-keys-factory";
import { useQuery } from "@tanstack/react-query";

//! NOT USED AT THE MOMENT

const useServiceInfo = (serviceName, language) => {
	const serviceInfoApi = useApi(serviceInfo);

	const getServiceInfo = async ({ queryKey }) => {
		const [_, serviceName, language] = queryKey;
		const response = await serviceInfoApi.request(serviceName, language);
		return response.data;
	};

	const query = useQuery({
		queryKey: queryKeys.serviceInfo(serviceName, language),
		queryFn: getServiceInfo,
	});

	return query;
};

export default useServiceInfo;
