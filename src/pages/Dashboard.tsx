import { useState, useEffect } from "react";
import {
	TrendingUp,
	Target,
	Clock,
	Users,
	DollarSign,
} from "lucide-react";

const Dashboard = () => {
	// Presale configuration
	const PRESALE_TARGET = 10000;
	const PRESALE_END_DATE = new Date("2025-12-05T23:59:59"); // End date

	// Current progress
	const [raised] = useState(0);
	const [contributors] = useState(0);

	// Calculate progress percentage
	const progressPercentage = (raised / PRESALE_TARGET) * 100;

	// Calculate time remaining
	const [timeRemaining, setTimeRemaining] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date().getTime();
			const end = PRESALE_END_DATE.getTime();
			const distance = end - now;

			if (distance > 0) {
				setTimeRemaining({
					days: Math.floor(distance / (1000 * 60 * 60 * 24)),
					hours: Math.floor(
						(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
					),
					minutes: Math.floor(
						(distance % (1000 * 60 * 60)) / (1000 * 60)
					),
					seconds: Math.floor((distance % (1000 * 60)) / 1000),
				});
			}
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className='min-h-screen bg-[#0a0a0a] text-white px-4 py-8 md:px-6 lg:px-8'>
			<div className='max-w-6xl mx-auto space-y-8'>
				{/* Header */}
				<div className='text-center space-y-2'>
					<h1 className='text-3xl md:text-4xl font-bold text-primary-green'>
						Presale Dashboard
					</h1>
					<p className='text-gray-400'>
						Track the progress of our token presale
					</p>
				</div>

				{/* Main Stats Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					{/* Total Raised */}
					<div className='bg-[#111111] border border-gray-800 rounded-xl p-6 space-y-2'>
						<div className='flex items-center gap-2 text-gray-400'>
							<DollarSign className='w-5 h-5' />
							<span className='text-sm'>Total Raised</span>
						</div>
						<p className='text-3xl font-bold text-primary-green'>
							${raised.toLocaleString()}
						</p>
						<p className='text-xs text-gray-500'>
							of ${PRESALE_TARGET.toLocaleString()} goal
						</p>
					</div>

					{/* Progress Percentage */}
					<div className='bg-[#111111] border border-gray-800 rounded-xl p-6 space-y-2'>
						<div className='flex items-center gap-2 text-gray-400'>
							<Target className='w-5 h-5' />
							<span className='text-sm'>Progress</span>
						</div>
						<p className='text-3xl font-bold text-primary-green'>
							{progressPercentage.toFixed(1)}%
						</p>
						<p className='text-xs text-gray-500'>
							{(PRESALE_TARGET - raised).toLocaleString()} remaining
						</p>
					</div>

					{/* Contributors */}
					<div className='bg-[#111111] border border-gray-800 rounded-xl p-6 space-y-2'>
						<div className='flex items-center gap-2 text-gray-400'>
							<Users className='w-5 h-5' />
							<span className='text-sm'>Contributors</span>
						</div>
						<p className='text-3xl font-bold text-primary-green'>
							{contributors}
						</p>
						<p className='text-xs text-gray-500'>Early supporters</p>
					</div>

					{/* Token Price */}
					<div className='bg-[#111111] border border-gray-800 rounded-xl p-6 space-y-2'>
						<div className='flex items-center gap-2 text-gray-400'>
							<TrendingUp className='w-5 h-5' />
							<span className='text-sm'>Token Price</span>
						</div>
						<p className='text-3xl font-bold text-primary-green'>
							$0.01
						</p>
						<p className='text-xs text-gray-500'>Presale rate</p>
					</div>
				</div>

				{/* Progress Bar */}
				<div className='bg-[#111111] border border-gray-800 rounded-xl p-6 space-y-4'>
					<div className='flex items-center justify-between'>
						<h3 className='text-lg font-semibold'>
							Presale Progress
						</h3>
						<span className='text-sm text-gray-400'>
							{progressPercentage.toFixed(1)}% Complete
						</span>
					</div>

					<div className='relative w-full h-6 bg-gray-800 rounded-full overflow-hidden'>
						<div
							className='absolute top-0 left-0 h-full bg-gradient-to-r from-primary-green to-emerald-400 transition-all duration-500 rounded-full'
							style={{
								width: `${Math.min(progressPercentage, 100)}%`,
							}}
						>
							<div className='absolute inset-0 bg-white/20 animate-pulse'></div>
						</div>
					</div>

					<div className='flex justify-between text-sm text-gray-400'>
						<span>$0</span>
						<span>${PRESALE_TARGET.toLocaleString()}</span>
					</div>
				</div>

				{/* Countdown Timer */}
				<div className='bg-[#111111] border border-gray-800 rounded-xl p-6 space-y-4'>
					<div className='flex items-center gap-2'>
						<Clock className='w-5 h-5 text-primary-green' />
						<h3 className='text-lg font-semibold'>Time Remaining</h3>
					</div>

					<div className='grid grid-cols-4 gap-4'>
						<div className='text-center'>
							<div className='bg-[#0a0a0a] border border-gray-700 rounded-lg p-4'>
								<p className='text-3xl font-bold text-primary-green'>
									{timeRemaining.days}
								</p>
								<p className='text-xs text-gray-400 mt-1'>Days</p>
							</div>
						</div>
						<div className='text-center'>
							<div className='bg-[#0a0a0a] border border-gray-700 rounded-lg p-4'>
								<p className='text-3xl font-bold text-primary-green'>
									{timeRemaining.hours}
								</p>
								<p className='text-xs text-gray-400 mt-1'>Hours</p>
							</div>
						</div>
						<div className='text-center'>
							<div className='bg-[#0a0a0a] border border-gray-700 rounded-lg p-4'>
								<p className='text-3xl font-bold text-primary-green'>
									{timeRemaining.minutes}
								</p>
								<p className='text-xs text-gray-400 mt-1'>Minutes</p>
							</div>
						</div>
						<div className='text-center'>
							<div className='bg-[#0a0a0a] border border-gray-700 rounded-lg p-4'>
								<p className='text-3xl font-bold text-primary-green'>
									{timeRemaining.seconds}
								</p>
								<p className='text-xs text-gray-400 mt-1'>Seconds</p>
							</div>
						</div>
					</div>
				</div>

				{/* Info Cards */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<div className='bg-[#111111] border border-gray-800 rounded-xl p-6 space-y-2'>
						<h4 className='font-semibold text-primary-green'>
							Hard Cap
						</h4>
						<p className='text-2xl font-bold'>$10,000</p>
						<p className='text-xs text-gray-500'>
							Maximum presale target
						</p>
					</div>

					<div className='bg-[#111111] border border-gray-800 rounded-xl p-6 space-y-2'>
						<h4 className='font-semibold text-primary-green'>
							Launch Date
						</h4>
						<p className='text-2xl font-bold'>TBA</p>
						<p className='text-xs text-gray-500'>
							After presale completion
						</p>
					</div>
				</div>

				{/* Status Banner */}
				<div className='bg-gradient-to-r from-primary-green/10 to-emerald-400/10 border border-primary-green/30 rounded-xl p-6 text-center'>
					<p className='text-lg font-semibold text-primary-green mb-2'>
						🚀 Presale is Live!
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
