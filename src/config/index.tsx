import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { pulsechain } from "@reown/appkit/networks";

// Your project ID
export const projectId = "439ba9dca29631ed26df20294d76ef51";

// Wallet address to receive presale payments
export const recieveWallet =
	"0x2acf4414ded94d0dd3810aef68938348a9a8de0d";

if (!projectId) {
	throw new Error("Project ID is not defined");
}

// Define the networks you want to support
export const networks = [pulsechain];

// Set up the Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
	storage: createStorage({
		storage: cookieStorage,
	}),
	ssr: false, // Set to false for Vite/React (not Next.js)
	networks,
	projectId,
});

export const config = wagmiAdapter.wagmiConfig;
