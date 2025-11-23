import AppRoutes from "./routes/routes";
import ContextProvider from "./provider/index";

const App = () => {
	return (
		<ContextProvider>
			<AppRoutes />
		</ContextProvider>
	);
};

export default App;
