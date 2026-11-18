
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import { redirect } from 'next/navigation';

const UpdateProfilePage = async () => {

    // Get logged-in user's session
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    console.log(session);

    // Check whether user is logged in
    if (!session) {
        redirect('/sign-in');
    }

    return (
        <div>
            <h2>This is update profile page</h2>

            <p>Name: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
        </div>
    );
};

export default UpdateProfilePage;
