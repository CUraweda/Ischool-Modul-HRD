import { LogoText, Navbar } from '@/components/organisms';
import { Outlet } from 'react-router-dom';

function HrdLayout() {
	const drawerId = 'hrd-drawer';

	return (
		<div className="drawer min-h-screen bg-sky lg:drawer-open">
			<input id={drawerId} type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				<Navbar drawerId={drawerId} />
				<div className="w-full max-w-screen-lg p-6">
					<Outlet />
				</div>
			</div>
			<div className="drawer-side p-0">
				<label htmlFor={drawerId} aria-label="close sidebar" className="drawer-overlay w-screen"></label>
				<div className="m-0 min-h-full w-80 border bg-white p-4 text-base-content">
					<LogoText className="hidden lg:flex" />
				</div>
			</div>
		</div>
	);
}

export default HrdLayout;
