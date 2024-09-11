import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
	roles: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {
	const accessToken = sessionStorage.getItem('access_token');
	const role = sessionStorage.getItem('role_id');

	if (!accessToken || !roles.includes(Number(role))) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
