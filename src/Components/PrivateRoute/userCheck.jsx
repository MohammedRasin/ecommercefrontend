import { Outlet, Navigate } from 'react-router-dom';

import { CheckToken } from '../../Utils';

const UserPrivateRoute = () => {
  if (CheckToken()) return <Outlet />;
  else return <Navigate to="/" />;
};

export default UserPrivateRoute;
