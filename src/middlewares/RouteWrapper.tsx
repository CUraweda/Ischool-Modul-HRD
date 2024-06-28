import { useAuth } from '@/hooks';
import ForbiddenPage from '@/pages/ForbiddenPage';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type ProtectedRouteProps = {
	roles: number[];
	children: React.ReactNode;
	fallback?: 'redirect' | 'alert' | 'page';
};

function ProtectedRoute({ children, roles, fallback = 'redirect' }: ProtectedRouteProps) {
	const { hasAccess } = useAuth(roles);

	useEffect(() => {
		if (!hasAccess) toast.warn('Anda tidak memiliki akses ke halaman ' + (fallback == 'redirect' ? 'tersebut' : 'ini'));
	}, [hasAccess]);

	if (!hasAccess) {
		if (fallback == 'redirect') return <Navigate to={'/login'} />;
		else if (fallback == 'page') return <ForbiddenPage />;
	}

	return children;
}

type RedirectRouteProps = {
	children: React.ReactNode;
};

function RedirectRoute({ children }: RedirectRouteProps) {
	const navigate = useNavigate();
	const { sessionData } = useAuth();

	useEffect(() => {
		if (sessionData) {
			if (sessionData.role_id == 6) navigate('/dashboard');
			else navigate('/');
		}
	}, [sessionData, navigate]);

	if (sessionData) {
		if (sessionData.role_id == 6) return <Navigate to={'/dashboard'} />;
		else return <Navigate to={'/'} />;
	}

	return children;
}

export { ProtectedRoute, RedirectRoute };
