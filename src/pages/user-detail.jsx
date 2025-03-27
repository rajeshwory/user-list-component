import { useState, useEffect } from 'react';
import supabase from '@/config/supabaseClient';
import withAuth from '@/hoc/withAuth';

const UserDetail = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const { data: {user}, error: userError } = await supabase.auth.getUser()
          

        if (userError) throw error;
        setUserDetails(user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails()
  }, []);

  if (loading) return <div>Loading user details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Details</h1>
      <p>{userDetails?.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default withAuth(UserDetail);