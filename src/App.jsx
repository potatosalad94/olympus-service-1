import Landing from "@views/landing/Landing";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import GlobalError from "./GlobalError";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <GlobalError />,
		children: [
			{
				path: "",
				element: <Landing />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
