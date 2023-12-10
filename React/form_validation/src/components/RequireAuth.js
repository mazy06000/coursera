import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

        console.log(`auth: ${JSON.stringify(auth)}`);
    const decoded = auth?.accessToken
        ? jwtDecode(auth.accessToken)
        : undefined;

    console.log(`decoded: ${JSON.stringify(decoded)}`);

    const roles = decoded?.roles || [];

    return (
        roles.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location}} replace />
                : <Navigate to="/login" state={{ from: location}} replace />
    );
}

export default RequireAuth;