import React, { useEffect, useState } from 'react';
import { BsListNested } from 'react-icons/bs';
import { iconMapping } from '../components/icon/icon';
import logo from '../assets/images/sadeLogo.png';
import { Link } from 'react-router-dom';
import menuHRD from '../data/hrd.json';
import { getSessionStorageItem } from '@/utils/storageUtils';

interface Menu {
	title: string;
	url: string;
	icon: string;
	roles?: number[];
	hide?: boolean;
	submenu: boolean;
	subtitle?: subtitle[];
}

type subtitle = {
	name: string;
	url: string;
};

const Sidebar = () => {
	const Side = sessionStorage.getItem('side') || '/';
	const [data, setData] = useState<Menu[]>([]);
	const [activeMenuItem, setActiveMenuItem] = useState<string>(Side);
	const role = getSessionStorageItem('role_id');
	const handleMenuItemClick = (name: string) => {
		setActiveMenuItem(name);
		sessionStorage.setItem('side', name);
	};

	const Role = role ? parseInt(role) : 0;
	useEffect(() => {
		console.log('User Role:', Role);
		// if (Role === 6) {
		setData(menuHRD);
		// }
	}, [Role]);

	return (
		<div>
			<div className="drawer lg:drawer-open">
				<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
				<div className="drawer-side">
					<label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" />
					<ul className="menu min-h-screen bg-base-100 p-4">
						<div className="mb-3 flex w-full items-center justify-between pb-6">
							<div className="flex items-center justify-center gap-1">
								<img src={logo} alt="logo" className="w-20" />
								<p className="text-xl font-bold sm:text-xl">Sekolah Alam Depok</p>
							</div>
							<label htmlFor="my-drawer-2" className="btn btn-ghost text-3xl font-bold lg:hidden">
								<BsListNested />
							</label>
						</div>

						<ul className="menu w-full max-w-xs rounded-lg font-bold text-gray-500">
							{data.map((item: Menu, index: number) => (
								<React.Fragment key={`menu-` + index}>
									{item.submenu ? (
										<li className="my-2">
											<details>
												<summary>
													<span className="text-2xl">{iconMapping[item.icon]}</span>
													<a>{item.title}</a>
												</summary>
												<ul>
													{item.subtitle?.map((Item: subtitle, Index: number) => (
														<Link to={Item.url} key={`link-` + Index}>
															<li
																key={`subtitle-` + Index}
																className={`my-2 rounded-md transition duration-200 ${
																	activeMenuItem === Item.url ? 'bg-blue-100 text-blue-600' : ''
																}`}
																onClick={() => handleMenuItemClick(Item.url)}
															>
																<p>{Item.name}</p>
															</li>
														</Link>
													))}
												</ul>
											</details>
										</li>
									) : (
										<Link to={item.url} key={`link-` + index}>
											<li
												className={`my-2 rounded-md transition duration-200 ${
													activeMenuItem === item.url ? 'bg-blue-100 text-blue-600' : ''
												}`}
												onClick={() => handleMenuItemClick(item.url)}
											>
												<div>
													<span className="text-2xl">{iconMapping[item.icon]}</span>
													<p>{item.title}</p>
												</div>
											</li>
										</Link>
									)}
								</React.Fragment>
							))}
						</ul>
						<div className="mt-auto"></div>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
