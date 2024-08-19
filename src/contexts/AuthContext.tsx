import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
	accessToken: string | null;
	role: string | null;
	login: (token: string, role: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [role, setRole] = useState<string | null>(null);

	const login = (token: string, role: string) => {
		setAccessToken(token);
		setRole(role);
		sessionStorage.setItem('access_token', token);
		sessionStorage.setItem('role', role);
	};

	const logout = () => {
		setAccessToken(null);
		setRole(null);
		sessionStorage.removeItem('access_token');
		sessionStorage.removeItem('role');
	};

	return <AuthContext.Provider value={{ accessToken, role, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
