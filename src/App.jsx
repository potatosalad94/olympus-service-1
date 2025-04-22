import Landing from "@views/landing/Landing";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import GlobalError from "./GlobalError";
import TermsConditions from "./views/legal/TermsConditions";
import PrivacyPolicy from "./views/legal/PrivacyPolicy";

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
				path: ":languageCode/terms_and_conditions",
				element: <TermsConditions />,
			},
			{
				path: ":languageCode/privacy_policy",
				element: <PrivacyPolicy />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
