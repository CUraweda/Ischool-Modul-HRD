import { useAppDispatch, useAppSelector } from '@/hooks';
import { cn } from '@/utils';
import { RiLogoutCircleLine, RiMenu2Line, RiUserLine } from '@remixicon/react';
import { Link } from 'react-router-dom';
import { LogoText } from './Brands';
import { clearUser } from '@/stores/user';

type Props = {
	drawerId?: string;
	drawerHiddenClass?: string;
};

function Navbar({ drawerId, drawerHiddenClass = 'lg:hidden' }: Props) {
	const { session } = useAppSelector((s) => s.user),
		dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(clearUser());
	};

	return (
		<div className="navbar w-full overflow-visible bg-white px-6 py-3 shadow-md">
			<div className={cn('flex-none', drawerHiddenClass)}>
				{drawerId && (
					<label htmlFor={drawerId} aria-label="open sidebar" className="btn btn-square btn-ghost me-2">
						<RiMenu2Line />
					</label>
				)}
			</div>

			{drawerId ? <LogoText className={drawerHiddenClass} /> : <LogoText />}
			<div className="ms-auto flex items-center gap-3">
				{session ? (
					<>
						<div className="dropdown dropdown-end dropdown-bottom h-12">
							<div tabIndex={0} role="button" className="avatar">
								<div className="w-12 rounded-full">
									<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
								</div>
							</div>
							<div className="dropdown-content z-[1] mt-4 w-52 rounded-box bg-white shadow">
								<p className="text-p px-3 pt-3">
									Halo, <b>{session.full_name}</b>
								</p>
								<ul className="menu m-0">
									<li className="m-0">
										<Link to={'/'} className="text-p">
											<RiUserLine size={16} className="me-2" />
											Profile
										</Link>
									</li>
									<li className="m-0">
										<button onClick={handleLogout} className="text-p text-error">
											<RiLogoutCircleLine size={16} className="me-2" />
											Log Out
										</button>
									</li>
								</ul>
							</div>
						</div>
					</>
				) : (
					<>
						<Link to={'/signup'} className="btn btn-outline btn-primary">
							Daftar
						</Link>
						<Link to={'/login'} className="btn btn-primary">
							Log In
						</Link>
					</>
				)}
			</div>
		</div>
	);
}

export default Navbar;
