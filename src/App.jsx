import Landing from "@views/landing/Landing";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import GlobalError from "./GlobalError";
// import NotFound from "./views/not-found/NotFound";
import Confirmation from "./views/confirmation/Confirmation";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <GlobalError />,
		children: [
			{
				path: "",
				element: <Landing />,
			},
			{
				path: "/confirmation",
				element: <Confirmation />,
			},
			// {
			// 	path: "*",
			// 	element: <NotFound />,
			// },
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
