import { useState, useEffect } from 'react';
import supabase from '@/config/supabaseClient';
import withAuth from '@/hoc/withAuth';


const UserDetail = ({session}) => {

    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (session) {
            const userMetadata = session.user.user_metadata;
            setFormData((prev) => ({
                ...prev,
                name: userMetadata?.name || '',
            }));
            setLoading(false);
        }
    }, [session]);

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const updates = {};

            if (formData.name !== session.user.user_metadata?.name) {
                updates.data = { name: formData.name };
            }

            if (formData.password !== '') {
                updates.password = formData.password;
            }

            if (Object.keys(updates).length > 0) {
                const { error: authError } = await supabase.auth.updateUser(updates);
                if (authError) throw authError;
            }

            // setSuccess('Profile updated successfully!');
            setFormData((prev) => ({ ...prev, password: '' })); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const { data: { user }, error: userError } = await supabase.auth.getUser()


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
            <h1 className='text-2xl font-bold my-6'>User Details</h1>
            <form onSubmit={handleSubmit} className='space-y-8'>
                <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your name"
                    />
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your name"
                    />
                    <label htmlFor="password" className="block mb-1">New Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter new password (leave blank to keep current)"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        Submit
                    </button>
                </div>
            </form>


            <button onClick={handleSignOut} className='w-1/6 bg-zinc-500 text-white rounded mt-6 p-2'>Sign Out</button>
        </div>
    );
};

export default withAuth(UserDetail);