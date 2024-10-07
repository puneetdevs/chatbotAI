import { QueryClient, QueryClientProvider } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import "simplebar-react/dist/simplebar.min.css";
import { useRoutes } from "react-router-dom";
import Router from "./Routes";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { setAxiosToken } from './services/setAxiosToken';
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
const Auth = () => {

	const { getToken, isLoaded, isSignedIn } = useAuth();


	useEffect(() => {
		const setTokenToState = async () => {
			try {
				const token = await getToken();
				setAxiosToken(token);
			} catch (error) {
				console.error('Error setting token to state:', error);
			}
		};

		// Initial token check
		if (isLoaded && isSignedIn) {
			setTokenToState();
		} else {
			setAxiosToken(null);

		}

		// Set up an interval to periodically check for the updated token
		const intervalId = setInterval(() => {
			if (isLoaded && isSignedIn) {
				setTokenToState();
			} else {
				setAxiosToken(null);
			}
		}, 10000); // Adjust the interval time (in milliseconds) as needed

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, [isLoaded, isSignedIn]);
	return <></>
}

function App() {
	const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
	if (!PUBLISHABLE_KEY) {
		throw new Error("Missing Publishable Key");
	}
	const routing = useRoutes(Router);

	return (
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<QueryClientProvider client={queryClient}>
				<Auth />
				<ToastContainer
					position="top-center"
					autoClose={1000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
					transition={Bounce}
				/>
				{routing}
			</QueryClientProvider>
		</ClerkProvider>
	);
}

export default App;
