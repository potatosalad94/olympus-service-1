import { useState, useEffect } from "react";

const useConnectionInfo = () => {
	const [connectionInfo, setConnectionInfo] = useState({
		type: "unknown",
		effectiveType: "unknown",
	});

	useEffect(() => {
		const updateConnectionInfo = () => {
			if ("connection" in navigator && navigator.connection) {
				const { type, effectiveType } = navigator.connection;
				console.log("🚀 ~ type >>", type);
				console.log("🚀 ~ effectiveType >>", effectiveType);

				setConnectionInfo({
					type: type || "unknown",
					effectiveType: effectiveType || "unknown",
				});
			}
		};

		updateConnectionInfo(); // Initial check

		if ("connection" in navigator && navigator.connection) {
			navigator.connection.addEventListener("change", updateConnectionInfo);

			// Cleanup
			return () => navigator.connection.removeEventListener("change", updateConnectionInfo);
		}
	}, []);

	return connectionInfo;
};

export default useConnectionInfo;
