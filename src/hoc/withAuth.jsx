import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  supabase  from '@/config/supabaseClient';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const [session, setSession] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          if (!session) {
            navigate('/login');
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }, [navigate]);

    return <WrappedComponent {...props} session={session} />;
  };

  return AuthComponent;
};

export default withAuth;