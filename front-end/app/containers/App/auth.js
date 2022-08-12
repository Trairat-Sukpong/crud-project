import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as env from '../../env.json'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(false);

    const Is_auth = async () => {
        await axios({
            method: "POST",
            withCredentials: true,
            url: env.host_api + "/api/auth/is_auth",
        })
            .then(async function (response) {

                await setCurrentUser(response.data.session);
                await setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    useEffect(() => {

        Is_auth()

    }, [])

    if (loading) {
        return <p>{process.env.HOST}</p>;
    }

    return (
        <AuthContext.Provider value={[currentUser, setCurrentUser]}>
            {children}
        </AuthContext.Provider>
    )
}