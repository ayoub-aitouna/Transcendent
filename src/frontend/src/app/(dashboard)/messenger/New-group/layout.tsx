import { UserProvider } from "./context/UserContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
}
