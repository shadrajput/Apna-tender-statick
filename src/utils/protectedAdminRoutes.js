import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProtectAdminRoutes = (WrappedComponent) => {
  
  const ProtectAdminRoutesWrapper = (props) => {
    const router = useRouter(); 
    const { user, token } = useSelector((state) => state.user);
    
    useEffect(() => {
      if(!token){
        router.push('/auth/signin')
      }
    }, []);
    
    
    useEffect(() => {
      if (token && Object.keys(user).length && !user.is_admin && router.pathname.startsWith("/admin")) {
          router.push('/'); 
        }
    }, [user]);

    return <WrappedComponent {...props} />;
  };

  return ProtectAdminRoutesWrapper;
};

export default ProtectAdminRoutes;