import Landing from "@views/landing/Landing";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import GlobalError from "./GlobalError";
import Confirmation from "./views/confirmation/Confirmation";
import RootLayout from "./components/Layout/RootLayout";

const router = createBrowserRouter([
	// {
	// 	path: "/",
	// 	element: <Landing />,
	// 	errorElement: <GlobalError />,
	// },
	// {
	// 	path: "/confirmation",
	// 	element: <Confirmation />,
	// 	errorElement: <GlobalError />,
	// },
	{
		path: "/",
		// element: <RootLayout />,
		errorElement: <GlobalError />,
		children: [
			{
				path: "",
				element: <Landing />,
			},
			{
				path: "confirmation",
				element: <Confirmation />, //TODO >> ?
			},
			//   {
			//     path: "*",
			//     element: <NotFound />,
			//   }
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
