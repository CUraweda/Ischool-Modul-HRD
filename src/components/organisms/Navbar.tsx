import { useAppDispatch } from '@/hooks';
import { BsList } from 'react-icons/bs';
import { clearUser } from '@/stores/user';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [isLogin, setLogin] = useState<boolean>(false);

	useEffect(() => {
		const accessToken = sessionStorage.getItem('access_token');
		const role = sessionStorage.getItem('role_id');

		if (accessToken || role) {
			setLogin(true);
		}
	}, []);

	const logout = () => {
		console.log('Logging out...');
		sessionStorage.clear();
		localStorage.clear();
		dispatch(clearUser());
		window.location.reload();
		navigate('/', { replace: true });
	};

	return (
		<div>
			<div className="navbar bg-base-100 shadow-md">
				<div className="flex-1">
					<label className="btn btn-ghost text-3xl xl:hidden" htmlFor="my-drawer-2">
						<BsList />
					</label>
				</div>
				<div className="flex-none gap-5">
					<button className={`btn btn-primary ${isLogin ? 'hidden' : ''}`} onClick={() => navigate('/login')}>
						Login
					</button>
					<div className={`dropdown dropdown-end ${isLogin ? '' : 'hidden'}`}>
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
