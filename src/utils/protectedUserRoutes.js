import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProtectUserRoutes = (WrappedComponent) => {

  const ProtectUserRoutesWrapper = (props) => {
    const router = useRouter();
    const { user, token } = useSelector((state) => state.user);

    useEffect(() => {
      if (!token) {
        router.push('/auth/signin')
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ProtectUserRoutesWrapper;
};

export default ProtectUserRoutes;
