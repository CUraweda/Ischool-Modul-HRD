import React from 'react';
import { Navbar } from '@/components/organisms';
import { getSessionStorageItem } from '@/utils/storageUtils';
import Sidebar from '@/components/Sidebar';
import { Outlet } from 'react-router-dom';
// interface Props {
// 	children?: React.ReactNode;
// }
const HrdLayout: React.FC<{}> = () => {
	// const drawerId = 'hrd-drawer';
	const token = getSessionStorageItem('access_token');
	console.log('Access Token:', token);
	return (
		<>
			<div className="flex h-screen w-full flex-col" data-theme="light">
				<div className="flex flex-grow">
					<div className="z-50">
						<Sidebar />
					</div>
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
