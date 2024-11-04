import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/organisms';
import Sidebar from '@/components/SidebarDefault';
import { Outlet } from 'react-router-dom';

const HrdLayout: React.FC = () => {
	const [asessor, setAsessor] = useState<boolean>(false);

	useEffect(() => {
		const is_asessor = sessionStorage.getItem('is_asessor');
		// Set asessor menjadi true jika nilai 'is_asessor' adalah 'true'
		if (is_asessor === 'true') {
			setAsessor(true);
		} else {
			setAsessor(false);
		}
	}, []); // [] memastikan efek hanya dijalankan sekali ketika komponen di-mount

	return (
		<>
			<div className="flex h-screen w-full flex-col overflow-hidden" data-theme="light">
				<div className="flex flex-grow">
					<div className="z-50 xl:w-fit">{asessor ? <Sidebar /> : <div />}</div>
					<div className="h-screen w-full" style={{ backgroundColor: '#BFDCFE' }}>
						<div className="">
							<Navbar />
						</div>
						<div className="max-w-5/4 max-h-[90%] overflow-auto p-5">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HrdLayout;
