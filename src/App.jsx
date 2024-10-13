import Landing from "@views/landing/Landing";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,

		//TODO >> add not found page as per react-router 6 tutorial: https://reactrouter.com/en/main/start/tutorial
		//TODO >> ajouter un error boundary
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
