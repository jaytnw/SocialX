import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const accessToken = authService.getAccessToken();

  return accessToken ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;