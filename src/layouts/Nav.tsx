import { logo } from "../assets";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import WalletConnectButton from "../components/WalletConnectButton";
const Nav = () => {
	const [open, setOpen] = useState(false);

	return (
		<nav className='text-white border-b border-gray-700 bg-[#0a0a0a]'>
			<div className='flex items-center justify-between px-4 py-3 md:px-6'>
				{/* Logo */}
				<NavLink to='/'>
					{" "}
					<img src={logo} alt='Logo' className='h-14 w-auto' />
				</NavLink>

				{/* Desktop Nav */}
				<div className='hidden md:flex items-center gap-6 text-sm'>
					<Link to='/'>
						<p className='hover:text-gray-300 cursor-pointer'>
							Presale
						</p>
					</Link>

					<Link to='/dashboard'>
						<p className='hover:text-gray-300 cursor-pointer'>
							Dashboard
						</p>
					</Link>
				</div>

				{/* Desktop Wallet */}
				<div className='hidden md:block'>
					<WalletConnectButton title='Connect Wallet' />
				</div>

				{/* Mobile menu icon */}
				<button className='md:hidden' onClick={() => setOpen(!open)}>
					{open ? (
						<X className='w-6 h-6' />
					) : (
						<Menu className='w-6 h-6' />
					)}
				</button>
			</div>

			{/* Mobile dropdown */}
			{open && (
				<div className='md:hidden px-4 pb-4 flex flex-col gap-4 text-sm'>
					<Link to='/'>
						<p className='hover:text-gray-300 cursor-pointer'>
							Presale
						</p>
					</Link>

					<Link to='/dashboard'>
						<p className='hover:text-gray-300 cursor-pointer'>
							Dashboard
						</p>
					</Link>

					<WalletConnectButton title='Connect Wallet' />
				</div>
			)}
		</nav>
	);
};

export default Nav;
