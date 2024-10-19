export const queryKeys = {
	serviceInfo: (serviceName, lang) => ["ServiceInfo", serviceName, lang],
	displayData: (step) => ["displayData", step],

	// landing: () => [...jobsKeys.all, "landing"],

	// lists: () => [...jobsKeys.all, "listJobs"],

	// searchList: (query, locationId) => [
	// 	...jobsKeys.lists(),
	// 	"search",
	// 	query,
	// 	locationId,
	// ],

	// recommended: (userCoordinates) => [
	// 	...jobsKeys.lists(),
	// 	"recommended",
	// 	userCoordinates,
	// ],

	// nearby: (userCoordinates) => [
	// 	...jobsKeys.lists(),
	// 	"nearby",
	// 	userCoordinates,
	// ],

	// saved: (jobType) => [...jobsKeys.lists(), "saved", jobType],
	// applied: (jobType) => [...jobsKeys.lists(), "applied", jobType],
	// search: (userId, query) => [...servicesKeys.searchList(), userId, query],

	// serviceLvl: (level, userId, parentId) =>
	//     [...servicesKeys.lists(), { level }, userId, parentId].filter(
	//         (item) => item !== undefined
	//     ),

	// details: () => [...servicesKeys.all, "details"],

	// infinitMedias: (serviceId) => [
	//     ...servicesKeys.details(),
	//     "mediasInfinit",
	//     serviceId,
	// ],

	// countableMedias: (serviceId) => [
	//     ...servicesKeys.details(),
	//     "mediasCountable",
	//     serviceId,
	// ],

	// products: (serviceId) => [...servicesKeys.details(), "products", serviceId],

	// detail: (serviceId) => [...servicesKeys.details(), serviceId],

	// suggested: () => [...servicesKeys.lists(), "suggested"],
};
