import { displayData } from "@api/client";
import useApi from "./useApi";
import { queryKeys } from "@/app-keys-factory";
import { useQuery } from "@tanstack/react-query";
import useConnectionInfo from "./useConnectionInfo";
import useDataCollection from "./useDataCollection";
import { useEffect } from "react";
import useVisitorId from "./useVisitorId";

const useDisplayData = (serviceName, step, enabled = true, testResponse) => {
	const isNewVisit = step === "New Visit";

	const { visitorId: storedVisitorId, updateVisitorId } = useVisitorId();
	const { type } = useConnectionInfo();

	const { visitorInfo, isCollecting } = useDataCollection(isNewVisit);

	const displayDataApi = useApi(displayData);

	const getData = async ({ queryKey }) => {
		const [_, step] = queryKey;
		const response = await displayDataApi.request({
			serviceName,
			step,
			connectionType: type.charAt(0).toUpperCase() + type.slice(1), //~ MANDATORY
			...(isNewVisit && !isCollecting && visitorInfo),
			...(storedVisitorId && { visitorId: storedVisitorId }),
			...(testResponse && { testResponse: testResponse }), //* FOR TEST PURPOSES ONLY
		});
		return response.data;
	};

	const query = useQuery({
		queryKey: queryKeys.displayData(step),
		queryFn: getData,
		enabled: isNewVisit ? enabled && !isCollecting : enabled,
		retry: 2,
		throwOnError: true,
	});

	useEffect(() => {
		if (query?.data?.visitorId) {
			updateVisitorId(query?.data?.visitorId);
		}
	}, [query?.data?.visitorId]);

	return { query, storedVisitorId, isCollecting };
};

export default useDisplayData;
