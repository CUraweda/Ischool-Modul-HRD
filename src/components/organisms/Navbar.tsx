import { useAppDispatch } from '@/hooks';
import { FaBell } from 'react-icons/fa';
import { BsList } from 'react-icons/bs';
import { clearUser } from '@/stores/user';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const logout = () => {
		sessionStorage.clear();
		dispatch(clearUser());
		navigate('/login');
	};
	return (
		<div>
			<div className="navbar bg-base-100 shadow-md">
				<div className="flex-1">
					<label className="btn btn-ghost text-3xl lg:hidden" htmlFor="my-drawer-2">
						<BsList />
					</label>
				</div>
				<div className="mr-3">
					<button className="btn btn-circle btn-ghost text-xl">
						<FaBell />
					</button>
				</div>
				<div className="flex-none gap-5">
					<div className="dropdown dropdown-end">
						<div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
							<div className="w-10 rounded-full">
								<img
									alt="Tailwind CSS Navbar component"
									src="https://korpri.padang.go.id/assets/img/dewan_pengurus/no-pict.jpg"
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
						>
							<li>
								<a href="/profile" className="justify-between">
									Profile
								</a>
							</li>
							<li onClick={logout} className="text-red-500">
								<a>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
