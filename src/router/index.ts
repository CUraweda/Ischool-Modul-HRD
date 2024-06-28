import { createBrowserRouter, RouteObject } from 'react-router-dom';
import publicRoutes from './public';
import hrdRoutes from './hrd';
import authRoutes from './auth';

const flattenRoutes = (routes: RouteObject[], parentPath: string = ''): RouteObject[] => {
	let result: RouteObject[] = [];

	routes.forEach((route) => {
		const currentPath = parentPath ? `${parentPath}/${route.path}` : route.path;
		const { children, ...rest } = route;

		if (children) {
			result = result.concat(flattenRoutes(children, currentPath));
		} else {
			rest.path = currentPath;
			result.push(rest);
		}
	});

	return result;
};

export const routes = [...publicRoutes, ...hrdRoutes, ...authRoutes];
export const flatRoutes = flattenRoutes(routes);

const router = createBrowserRouter(routes);

export default router;
