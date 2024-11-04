// import { useState } from "react";

// const useVisitorId = () => {
// 	const [visitorId, setVisitorId] = useState(() =>
// 		localStorage.getItem("visitorId")
// 	);

// 	const updateVisitorId = (newVisitorId) => {
// 		if (newVisitorId && newVisitorId !== visitorId) {
// 			setVisitorId(newVisitorId);
// 			localStorage.setItem("visitorId", newVisitorId);
// 		}
// 	};

// 	return { visitorId, updateVisitorId };
// };

// export default useVisitorId;

import { useState, useEffect } from "react";

const useVisitorId = () => {
	const [visitorId, setVisitorId] = useState(() =>
		localStorage.getItem("visitorId")
	);

	useEffect(() => {
		const handleStorageChange = () => {
			const newVisitorId = localStorage.getItem("visitorId");
			if (newVisitorId !== visitorId) {
				setVisitorId(newVisitorId);
			}
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [visitorId]);

	const updateVisitorId = (newVisitorId) => {
		if (newVisitorId && newVisitorId !== visitorId) {
			setVisitorId(newVisitorId);
			localStorage.setItem("visitorId", newVisitorId);
			window.dispatchEvent(new Event("storage"));
		}
	};

	return { visitorId, updateVisitorId };
};

export default useVisitorId;
