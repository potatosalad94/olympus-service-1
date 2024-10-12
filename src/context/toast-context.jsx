import { Toast } from "primereact/toast";
import { createContext, useRef } from "react";

// create context
export const ToastContext = createContext(undefined);

// wrap context provider to add functionality
export const ToastContextProvider = ({ children }) => {
	const toastRef = useRef(null);

	const showToast = (options) => {
		if (!toastRef.current) return;
		toastRef.current.show(options);
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			<div
				onClick={(e) => {
					e.stopPropagation(); // Stops the click event from propagating to the toast
				}}
			>
				<Toast ref={toastRef} />
			</div>

			<div>{children}</div>
		</ToastContext.Provider>
	);
};
