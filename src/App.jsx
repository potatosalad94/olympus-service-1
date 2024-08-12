import Landing from "@views/landing/Landing";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
