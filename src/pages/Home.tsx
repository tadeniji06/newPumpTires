import { Dot, Gem, Calculator, Rocket } from "lucide-react";
import PresaleSection from "../components/PresaleSection";

const Home = () => {
	return (
		<div className='text-white px-4 md:px-10 lg:px-24 py-12 space-y-16'>
			{/* HERO */}
			<section className='space-y-6 max-w-3xl'>
				<h1 className='text-4xl md:text-5xl font-extrabold leading-tight'>
					pulseX <span className='text-primary-green'>Watch</span>
				</h1>

				<p className='text-lg text-gray-300'>
					Never miss any actions in the Pulse trenches.
				</p>

				<p className='text-gray-400 leading-relaxed'>
					pulseX Watcher is a real-time monitoring and alert system
					built for the Pumptires and Pulse ecosystem. We track new
					token launches, bonded tokens, big buys, sells, whale
					movements and more, delivering fast notifications so you can
					act earlier and smarter.
				</p>

				<div className='h-1 w-24 bg-primary-green rounded-full'></div>
			</section>

			{/* TRACKING SECTION */}
			<section className='border border-gray-800 rounded-xl p-6 md:p-10 bg-[#0c0c0c] shadow-[0_0_15px_-5px_rgba(52,208,127,0.3)]'>
				<h2 className='text-2xl font-semibold mb-4 flex items-center gap-2'>
					<Gem className='w-6 h-6 text-primary-green' />
					What pulseX Watch Tracks
				</h2>

				<div className='grid md:grid-cols-2 gap-3 text-gray-300'>
					<div className='flex items-center gap-2'>
						<Dot /> New token launches
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Bonded tokens
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Big buys & sells
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Whale entries
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Liquidity changes
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Custom alerts
					</div>
				</div>

				<p className='text-gray-400 mt-6'>
					The mission is simple: deliver the fastest, cleanest and
					most accurate alerts — no noise, all signal.
				</p>
			</section>

			{/* TOKEN SECTION */}
			<section className='space-y-6 bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 md:p-10'>
				<h2 className='text-2xl font-semibold flex items-center gap-2'>
					<Gem className='w-6 h-6 text-primary-green' />
					<span className='text-primary-green'>$XWATCH</span> —
					Ecosystem Token
				</h2>

				<p className='text-gray-400 leading-relaxed'>
					The pulseX Watch ecosystem will be powered by{" "}
					<span className='text-primary-green'>$XWATCH</span>, the
					utility token unlocking deeper insights, priority alerts,
					and premium tools.
				</p>

				<h3 className='font-semibold text-lg text-primary-green'>
					Token Utility
				</h3>

				<div className='space-y-2 text-gray-300'>
					<div className='flex items-center gap-2'>
						<Dot /> Access to Premium Alerts — priority notifications,
						deeper data, customization.
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Boosted Referral Rewards — multipliers for
						holders/stakers.
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Future Tools & Integrations — expanding utility as
						the suite grows.
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Community Governance — vote on upgrades &
						improvements.
					</div>
				</div>
			</section>

			{/* TOKENOMICS */}
			<section className='bg-[#0c0c0c] border border-gray-800 rounded-xl p-6 md:p-10 shadow-[0_0_15px_-5px_rgba(52,208,127,0.25)]'>
				<h2 className='text-2xl font-semibold mb-4 flex items-center gap-2 text-primary-green'>
					<Calculator className='w-6 h-6 text-primary-green' />
					Tokenomics
				</h2>

				<div className='grid md:grid-cols-2 gap-3 text-gray-300'>
					<div className='flex items-center gap-2'>
						<Dot /> Total Supply: 10M $XWATCH
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Presale Allocation: 50%
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Liquidity: 30%
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Referral Rewards: 10%
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Marketing & Dev: 10%
					</div>
				</div>
			</section>

			{/* PRESALE DETAILS */}
			<section className='space-y-6 border border-gray-800 bg-[#0c0c0c] rounded-xl p-6 md:p-10'>
				<h2 className='text-2xl font-semibold flex items-center gap-2'>
					<Rocket className='w-6 h-6 text-primary-green' />
					<span className='text-primary-green'>Presale Details</span>
				</h2>

				<p className='text-gray-400'>
					The $XWATCH presale is hosted directly on this website.
				</p>

				<div className='text-gray-300 space-y-2'>
					<div className='flex items-center gap-2'>
						<Dot /> Token: $XWATCH
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Type: Public Fair Presale
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Hardcap: $10k USDC, 800M $PLS
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Duration: Until hardcap is reached
					</div>
					<div className='flex items-center gap-2'>
						<Dot /> Minimum Buy: $10 USDC, 500k $PLS
					</div>
				</div>

				<p className='text-gray-500 pt-2'>
					Participants will receive their tokens immediately after the presale concludes, and liquidity will be added right after.
				</p>
			</section>

			{/* PRESALE COMPONENT */}
			<PresaleSection />
		</div>
	);
};

export default Home;
