'use client'

import React, { useCallback } from 'react'
const REACT_APP_REDIRECT_URL_ENDPOINT = 'http://localhost:3000'

const OAuthentication2 = ({ children, provider, AuthUrl, scope, client_id }: Readonly<{
    children: React.ReactNode;
    AuthUrl: string;
    scope: string;
    client_id: string;
    provider: string;
}>) => {
    const OpenLoginPage = useCallback(() => {
        const params = new URLSearchParams({
            response_type: "code",
            client_id: client_id,
            redirect_uri: `${REACT_APP_REDIRECT_URL_ENDPOINT}/auth`,
            prompt: 'select_account',
            access_type: 'offline',
            state: provider,
            scope
        })
        const url = `${AuthUrl}?${params}`;
        window.location.href = url
    }, []);

    return (
        <button onClick={OpenLoginPage} type='button'>
            {children}
        </button>
    )
}

export default OAuthentication2

