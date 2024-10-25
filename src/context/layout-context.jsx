import { createContext, useState } from "react";

export const AppContext = createContext(null);

//TODO >> to delete ?

export const AppProvider = ({ children }) => {
	const [landingData, setLandingData] = useState(null);
	const [handleContainerClick, setHandleContainerClick] = useState(null);

	const value = {
		landingData,
		setLandingData,
		handleContainerClick,
		setHandleContainerClick,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
