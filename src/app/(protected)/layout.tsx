import { ProtectedRoute } from '@/components/protected-route';

const ProtectedLayout = ({ children }: React.PropsWithChildren) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default ProtectedLayout;
