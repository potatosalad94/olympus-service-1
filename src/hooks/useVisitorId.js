import { useState } from "react";

const useVisitorId = () => {
	const [visitorId, setVisitorId] = useState(() =>
		localStorage.getItem("visitorId")
	);

	const updateVisitorId = (newVisitorId) => {
		if (newVisitorId && newVisitorId !== visitorId) {
			setVisitorId(newVisitorId);
			localStorage.setItem("visitorId", newVisitorId);
		}
	};

	return { visitorId, updateVisitorId };
};

export default useVisitorId;
