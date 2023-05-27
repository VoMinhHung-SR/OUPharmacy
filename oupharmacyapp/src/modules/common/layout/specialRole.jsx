import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { userContext } from '../../../App';
import UserContext from '../../../lib/context/UserContext';

const ProtectedSpecialRoleRoute = ({allowedRoles = []}) => {
    // const [user] = useContext(userContext);
    const {user} = useContext(UserContext);
    if (allowedRoles.length === 0)
        return <Outlet/>;
    return allowedRoles.includes(user.role) ? <Outlet/> : <Navigate to='/forbidden' />
}

export default ProtectedSpecialRoleRoute