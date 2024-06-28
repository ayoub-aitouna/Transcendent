import { UserProvider } from '@/app/ui/dashboard/messenger/context/UserContext';
import React from 'react';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
};

export default MyApp;
