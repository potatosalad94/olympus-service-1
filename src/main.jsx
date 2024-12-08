// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContext, ToastContextProvider } from "./context/toast-context";
import { createQueryClient } from "./react-query-config.js";
import { useContext } from "react";

function QueryClientWrapper({ children }) {
	const { showToast } = useContext(ToastContext);

	return (
		<QueryClientProvider client={createQueryClient(showToast)}>
			{children}
		</QueryClientProvider>
	);
}

createRoot(document.getElementById("root")).render(
	//   <StrictMode>
	<ToastContextProvider>
		<QueryClientWrapper>
			<App />
		</QueryClientWrapper>
	</ToastContextProvider>
	//   </StrictMode>,
);
