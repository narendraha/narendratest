import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function App1() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => {}
    });
    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        //localStorage.setItem('token', res.data?.data?.token)
                        { window.location.href = 'https://' + window.location.hostname + '/#/profile'; }
                    })
                    .catch((err) => {});
            }
        },
        [user]
    );
    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
    return (
        <>
            {profile != "" ? null : (
                <button onClick={() => login()} className='al_signinbuttons'><i className='icon_alfred_google'></i>Sign in with Google</button>
            )}
        </>
    );
};