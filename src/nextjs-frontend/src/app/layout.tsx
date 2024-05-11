import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./globals.scss";
import StoreProvider from "@/redux/Provider";
import BootstrapProvider from "./provider/bootstrap";
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
					<BootstrapProvider>
						{children}
					</BootstrapProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
