// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContextProvider } from "./context/toast-context";
import { AppProvider } from "./context/layout-context.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	//   <StrictMode>
	<QueryClientProvider client={queryClient}>
		<ToastContextProvider>
			{/* TODO >> to delete AppProvider ? */}
			<AppProvider>
				<App />
			</AppProvider>
		</ToastContextProvider>
	</QueryClientProvider>
	//   </StrictMode>,
);
