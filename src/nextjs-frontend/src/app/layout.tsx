import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./globals.scss";
import StoreProvider from "@/redux/Provider";
import BootstrapProvider from "@/app/provider/bootstrap";
import { ToastProvider } from "@/app/provider/ToastProvider";
import WithAuth from "@/app/provider/with-auth";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<StoreProvider>
					<WithAuth>
						<BootstrapProvider>
							<ToastProvider>{children}</ToastProvider>
						</BootstrapProvider>
					</WithAuth>
				</StoreProvider>
			</body>
		</html>
	);
}
