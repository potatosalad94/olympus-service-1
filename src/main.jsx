// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContextProvider } from "./context/toast-context";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	//   <StrictMode>
	<QueryClientProvider client={queryClient}>
		<ToastContextProvider>
			<App />
		</ToastContextProvider>
	</QueryClientProvider>
	//   </StrictMode>,
);
