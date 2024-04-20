import { navItem } from "@/type/dashboard/navitem";
import Home from "@/app/ui/dashboard/icons/nav/home";
import Turnements from "@/app/ui/dashboard/icons/nav/turnement";
import Ranking from "@/app/ui/dashboard/icons/nav/ranking";

export const navLinks: navItem[] = [
	{ title: "Play Now", href: "/game" },
	{ title: "Home", Icon: Home, href: "/home" },
	{ title: "Turnements", Icon: Turnements, href: "/turnements" },
	{ title: "Ranking", Icon: Ranking, href: "/ranking" },
];

export const socialLinks: any[] = [
	{
		Icon: Home,
		href: "https://www.facebook.com/",
	},
	{
		Icon: Home,
		href: "https://www.twitter.com/",
	},
	{
		Icon: Home,
		href: "https://www.instagram.com/",
	},
	{
		Icon: Home,
		href: "https://www.youtube.com/",
	},
];
