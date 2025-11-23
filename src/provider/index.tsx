import { createAppKit } from "@reown/appkit/react";
import { pulsechain } from "@reown/appkit/networks";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import React, { type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { wagmiAdapter, projectId } from "../config";
import { logo } from "../assets";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
	throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
	name: "Tires Watcher",
	description:
		"Real-time monitoring and alert system for Pumptires and Pulse ecosystem",
	url: "https://tireswatcher.com",
	icons: [logo],
};

// Create the modal
createAppKit({
	adapters: [wagmiAdapter],
	projectId,
	networks: [pulsechain],
	metadata: metadata,
	features: {
		analytics: true, 
	},
	themeMode: "dark", 
});

interface ContextProviderProps {
	children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({
	children,
}) => {
	return (
		<WagmiProvider config={wagmiAdapter.wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</WagmiProvider>
	);
};

export default ContextProvider;
