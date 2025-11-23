import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";

interface WalletConnectButtonProps {
	title?: string;
}

const WalletConnectButton = ({
	title = "Connect Wallet",
}: WalletConnectButtonProps) => {
	const { open } = useAppKit();
	const { address, isConnected } = useAccount();

	// Format address for display (show first 6 and last 4 characters)
	const formatAddress = (addr: string) => {
		return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
	};

	return (
		<div>
			{/* Custom button */}
			<button
				onClick={() => open()}
				className='px-6 py-2 bg-primary-green text-black font-semibold rounded-md hover:opacity-80 transition shadow-[0_0_15px_-5px_rgba(52,208,127,0.7)]'
			>
				{isConnected && address ? formatAddress(address) : title}
			</button>
		</div>
	);
};

export default WalletConnectButton;
