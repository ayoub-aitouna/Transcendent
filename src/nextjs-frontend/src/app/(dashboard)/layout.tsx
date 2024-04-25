import AuthNav from "@/app/ui/dashboard/nav";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div
			className='flex flex-col h-screen w-fu
        items-start justify-center gap-10   pt-[30px] px-[45px]'>
			<AuthNav />
			<div className='flex-1 w-full'>{children}</div>
		</div>
	);
}
