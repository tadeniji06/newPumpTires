import { useState, useEffect } from "react";
import {
	// TrendingUp,
	Target,
	Clock,
	// Users,
	DollarSign,
} from "lucide-react";
import { ethers } from "ethers";

const Dashboard = () => {
	// ================= CONFIG =================
	const PRESALE_TARGET = 10000; // USD
	const PRESALE_END_DATE = new Date("2025-12-05T23:59:59");
	const PRESALE_WALLET =
		"0x2acf4414ded94d0dd3810aef68938348a9a8de0d";

	// ⚠️ rough estimate – replace later with real price feed
	const PLS_TO_USD = 0.00005;

	const RPC_URL = "https://rpc.pulsechain.com";

	// ================= STATE =================
	const [raised, setRaised] = useState(0);

	const [timeRemaining, setTimeRemaining] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	// ================= WALLET BALANCE =================
	useEffect(() => {
		const provider = new ethers.JsonRpcProvider(RPC_URL);

		const fetchBalance = async () => {
			try {
				const balanceWei = await provider.getBalance(
					PRESALE_WALLET
				);

				const balancePLS = Number(
					ethers.formatEther(balanceWei)
				);

				const balanceUSD = balancePLS * PLS_TO_USD;

				setRaised(Math.floor(balanceUSD));
			} catch (err) {
				console.error("Balance fetch failed:", err);
			}
		};

		fetchBalance();
		const interval = setInterval(fetchBalance, 15000);

		return () => clearInterval(interval);
	}, []);

	// ================= COUNTDOWN =================
	useEffect(() => {
		const timer = setInterval(() => {
			const now = Date.now();
			const end = PRESALE_END_DATE.getTime();
			const distance = end - now;

			if (distance > 0) {
				setTimeRemaining({
					days: Math.floor(distance / (1000 * 60 * 60 * 24)),
					hours: Math.floor(
						(distance % (1000 * 60 * 60 * 24)) /
							(1000 * 60 * 60)
					),
					minutes: Math.floor(
						(distance % (1000 * 60 * 60)) /
							(1000 * 60)
					),
					seconds: Math.floor(
						(distance % (1000 * 60)) / 1000
					),
				});
			}
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const progressPercentage = Math.min(
		(raised / PRESALE_TARGET) * 100,
		100
	);

	return (
		<div className='min-h-screen bg-[#0a0a0a] text-white px-4 py-8'>
			<div className='max-w-6xl mx-auto space-y-8'>
				{/* Header */}
				<div className='text-center space-y-2'>
					<h1 className='text-4xl font-bold text-primary-green'>
						Presale Dashboard
					</h1>
					<p className='text-gray-400'>
						Live on-chain wallet tracking
					</p>
				</div>

				{/* Stats */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					<div className='bg-[#111] border border-gray-800 rounded-xl p-6'>
						<div className='flex items-center gap-2 text-gray-400'>
							<DollarSign className='w-5 h-5' />
							<span>Total Raised</span>
						</div>
						<p className='text-3xl font-bold text-primary-green'>
							${raised.toLocaleString()}
						</p>
						<p className='text-xs text-gray-500'>
							of ${PRESALE_TARGET.toLocaleString()}
						</p>
					</div>

					<div className='bg-[#111] border border-gray-800 rounded-xl p-6'>
						<div className='flex items-center gap-2 text-gray-400'>
							<Target className='w-5 h-5' />
							<span>Progress</span>
						</div>
						<p className='text-3xl font-bold text-primary-green'>
							{progressPercentage.toFixed(1)}%
						</p>
						<p className='text-xs text-gray-500'>
							${Math.max(
								PRESALE_TARGET - raised,
								0
							).toLocaleString()} remaining
						</p>
					</div>

					{/* <div className='bg-[#111] border border-gray-800 rounded-xl p-6'>
						<div className='flex items-center gap-2 text-gray-400'>
							<Users className='w-5 h-5' />
							<span>Contributors</span>
						</div>
						<p className='text-3xl font-bold text-primary-green'>
							{contributors}
						</p>
						<p className='text-xs text-gray-500'>
							Wallet-based presale
						</p>
					</div> */}

					{/* <div className='bg-[#111] border border-gray-800 rounded-xl p-6'>
						<div className='flex items-center gap-2 text-gray-400'>
							<TrendingUp className='w-5 h-5' />
							<span>Token Price</span>
						</div>
						<p className='text-3xl font-bold text-primary-green'>
							$0.01
						</p>
						<p className='text-xs text-gray-500'>
							Presale rate
						</p>
					</div> */}
				</div>

				{/* Progress Bar */}
				<div className='bg-[#111] border border-gray-800 rounded-xl p-6'>
					<div className='flex justify-between mb-2'>
						<span>Presale Progress</span>
						<span className='text-gray-400'>
							{progressPercentage.toFixed(1)}%
						</span>
					</div>
					<div className='w-full h-6 bg-gray-800 rounded-full overflow-hidden'>
						<div
							className='h-full bg-gradient-to-r from-primary-green to-emerald-400 transition-all'
							style={{ width: `${progressPercentage}%` }}
						/>
					</div>
				</div>

				{/* Countdown */}
				<div className='bg-[#111] border border-gray-800 rounded-xl p-6'>
					<div className='flex items-center gap-2 mb-4'>
						<Clock className='text-primary-green' />
						<h3 className='font-semibold'>Time Remaining</h3>
					</div>

					<div className='grid grid-cols-4 gap-4 text-center'>
						{Object.entries(timeRemaining).map(
							([key, value]) => (
								<div
									key={key}
									className='bg-[#0a0a0a] border border-gray-700 rounded-lg p-4'
								>
									<p className='text-3xl font-bold text-primary-green'>
										{value}
									</p>
									<p className='text-xs text-gray-400 capitalize'>
										{key}
									</p>
								</div>
							)
						)}
					</div>
				</div>

				{/* Status */}
				<div className='bg-gradient-to-r from-primary-green/10 to-emerald-400/10 border border-primary-green/30 rounded-xl p-6 text-center'>
					<p className='text-lg font-semibold text-primary-green'>
						🚀 Presale is Live
					</p>
					<p className='text-sm text-gray-300'>
						Join early and secure your tokens at the best price. Don't
						miss out!
					</p>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
