import { useEffect, useState } from 'react';
import { useAppSelector } from './useStore';

function useAuth(allowedRoles?: number[]) {
	const { session: sessionData } = useAppSelector((s) => s.user);
	const [hasAccess, setHasAccess] = useState(() => {
		if (allowedRoles?.length) {
			return sessionData?.role_id && (allowedRoles.includes(sessionData.role_id) || allowedRoles.includes(0));
		}
		return false;
	});

	useEffect(() => {
		if (allowedRoles?.length) {
			if (sessionData?.role_id && (allowedRoles.includes(sessionData.role_id) || allowedRoles.includes(0))) {
				setHasAccess(true);
			} else {
				setHasAccess(false);
			}
		}
	}, [allowedRoles, sessionData]);

	return { hasAccess, sessionData };
}

export default useAuth;
