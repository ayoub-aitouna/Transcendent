import AuthNav from '@/app/ui/auth/nav';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex flex-col h-screen w-full
        items-start justify-center pt-[30px] px-[45px]  mx-auto max-w-screen-4xl '>
            <AuthNav />
            <div className="flex-1 w-full">
                {children}
            </div>
        </div>
    );
}
