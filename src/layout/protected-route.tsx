// src/components/layout/protected-route.tsx
import {Navigate, useLocation} from 'react-router';
import {useAuth} from '@/hooks/useAuth';
import {toast} from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const {isAuthenticated, isLoading, role} = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  // Role check — only ADMIN allowed
  if (role !== 'ADMIN') {
    toast.warning('You are not authorized!');
    return <Navigate to="/login" replace />;
  }

  // Otherwise show children
  return <>{children}</>;
};
