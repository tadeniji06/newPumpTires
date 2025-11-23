import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const AppLayout = () => {
	return (
		<div>
			<Nav />
			<Outlet />
			<Footer />
		</div>
	);
};
export default AppLayout;
