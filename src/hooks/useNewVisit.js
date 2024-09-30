import { newVisit } from "@api/client";
import useApi from "./useApi";
import { queryKeys } from "@/app-keys-factory";
import { useQuery } from "@tanstack/react-query";
import useConnectionInfo from "./useConnectionInfo";
import { useEffect } from "react";
import useVisitorId from "./useVisitorId";

const useNewVisit = (serviceName, enabled = true, testResponse) => {
	const { type, effectiveType } = useConnectionInfo();
	const { visitorId: storedVisitorId, updateVisitorId } = useVisitorId();

	const newVisitApi = useApi(newVisit);

	const postNewVisit = async () => {
		const response = await newVisitApi.request({
			serviceName, //~ MANDATORY
			connectionType: type.charAt(0).toUpperCase() + type.slice(1), //~ MANDATORY
			// networkInformationEffectiveType: effectiveType, //TODO >> to add later with the rest of all the other optional parameters
			...(storedVisitorId && { visitorId: storedVisitorId }),
			...(testResponse && { testResponse: testResponse }), //! TEST PURPOSES

			//TODO
			// batteryLevel, //float (between 0.0 and 1.0)
			// batteryCharging, //bool
			// userTimezoneOffset //number
			// networkInformationRtt //string
			// networkInformationSaveData //bool
		});
		return response.data;
	};

	const query = useQuery({
		queryKey: queryKeys.newVisit,
		queryFn: postNewVisit,
		enabled,
	});

	useEffect(() => {
		if (query?.data?.visitorId) {
			updateVisitorId(query?.data?.visitorId);
		}
	}, [query?.data?.visitorId]);

	return query;
};

export default useNewVisit;
