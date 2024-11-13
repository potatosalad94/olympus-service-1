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
	const {
		type,
		// effectiveType
	} = useConnectionInfo(); //TODO >> included in useDataCollection, so not needed once implemented
	const { visitorInfo, isCollecting } = useDataCollection(isNewVisit);
	console.log("🚀 ~ isCollecting >>", isCollecting);

	const displayDataApi = useApi(displayData);

	const getData = async ({ queryKey }) => {
		const [_, step] = queryKey;
		const response = await displayDataApi.request({
			serviceName, //~ MANDATORY
			step,
			...(isNewVisit && !isCollecting && visitorInfo),
			connectionType: type.charAt(0).toUpperCase() + type.slice(1), //~ MANDATORY
			// networkInformationEffectiveType: effectiveType, //TODO >> to add later with the rest of all the other optional parameters
			...(storedVisitorId && { visitorId: storedVisitorId }),
			...(testResponse && { testResponse: testResponse }), //! TEST PURPOSES
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
