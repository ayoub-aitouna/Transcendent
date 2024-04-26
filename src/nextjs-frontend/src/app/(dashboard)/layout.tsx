import NavBar from "@/app/ui/dashboard/nav/NavBar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div
			className='flex flex-col items-start justify-center max-container '>
			<NavBar />
			<div className='flex-1 w-full'>{children}</div>
		</div>
	);
}
