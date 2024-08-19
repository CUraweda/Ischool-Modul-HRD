import React from 'react';
import { blueAbstractPattern, sadeLogo } from '@/assets/images';

interface AuthLayoutProps {
	children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
	return (
		<div className="flex min-h-screen w-screen">
			<div className="mx-auto grid w-full max-w-screen-lg grid-cols-2 gap-16 overflow-visible p-16">
				<div className="col-span-1 hidden overflow-hidden rounded-2xl md:block">
					<img src={blueAbstractPattern} className="m-0 h-full w-full object-cover" />
				</div>
				<div className="col-span-2 md:col-span-1">
					<img src={sadeLogo} className="mx-auto my-8 w-40" />
					{children}
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
