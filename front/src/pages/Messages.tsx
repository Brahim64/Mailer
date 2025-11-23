import type { User } from '@/models/User';
import { getUserProfile } from '@/services/UserService';
import React, { useEffect, useState } from 'react';

export const Messages: React.FC = () => {

    const [user, setUser] = useState<User | null>(null);

    

    useEffect(() => {
        getUserProfile()
            .then((fetchedUser) => {
                setUser(fetchedUser);
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
            });    
    }, [user]);
    return (
        <div>
            {user ? `Welcome, ${user.firstName} ${user.familyName}` : 'Loading user...'}
        </div>
    );
};

export default Messages;