import { Navigate } from 'react-router-dom';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const AdminLoginPage = () => {
  const { user, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (user?.isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <AdminLogin />;
};

export default AdminLoginPage;
