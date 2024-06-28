import { Navbar } from '@/components/organisms';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
	return (
		<div className="bg-sky min-h-screen w-screen overflow-x-hidden">
			<Navbar />
			<div className="mx-auto w-full max-w-screen-lg p-6">
				<Outlet />
			</div>
		</div>
	);
}

export default PublicLayout;
