import { ToastContext } from "@/context/toast-context";
import { useContext } from "react";

export const useToastContext = () => {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error(
			"useToastContext have to be used within ToastContextProvider"
		);
	}

	return context;
};
