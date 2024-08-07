import NavBar from "@/app/ui/dashboard/nav/NavBar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div
			className='flex flex-col items-start justify-start max-container h-full px-3'>
			<NavBar />
			<div className='flex-1 w-full h-full pb-10'>{children}</div>
		</div>
	);
}
