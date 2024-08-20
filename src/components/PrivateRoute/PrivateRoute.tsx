import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PrivateRouteProps {
  children: ReactNode;
  isAuth: boolean;
}

const PrivateRoute = ({ children, isAuth }: PrivateRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      // router.push('/#auth'); // redirect to /#auth if user not authenticate
      console.log(isAuth);
    }
  }, [isAuth, router]);

  // render children only if authenticate
  return isAuth ? children : null;
};

export default PrivateRoute;
