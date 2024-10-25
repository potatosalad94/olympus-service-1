import { AppContext } from "@/context/layout-context";
import { useContext } from "react";

//TODO >> DELETE ?
export const useAppContext = () => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider");
	}

	return context;
};
