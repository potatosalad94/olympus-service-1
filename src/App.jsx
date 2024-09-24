import Landing from "@views/landing/Landing";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,

		//TODO >> add not found page as per react-router 6 tutorial: https://reactrouter.com/en/main/start/tutorial
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
