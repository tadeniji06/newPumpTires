import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

export const routes = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
		],
	},
]);

const AppRoutes = () => {
	return <RouterProvider router={routes} />;
};
export default AppRoutes;
