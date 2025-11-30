import { Twitter } from "lucide-react";

const Footer = () => {
	return (
		<div className='text-white flex flex-col gap-3 justify-center items-center mb-8'>
			<div className='flex items-center gap-4'>
				<a
					href='https://x.com/pulsexalerts?s=21'
					target='_blank'
					rel='noopener noreferrer'
					className='text-gray-400 hover:text-primary-green transition-colors'
					aria-label='Follow us on Twitter'
				>
					<Twitter className='w-5 h-5' />
				</a>
			</div>
			<p>Tires Watcher @ 2025</p>
			<small className='text-gray-500'>All rights reserved</small>
		</div>
	);
};

export default Footer;
