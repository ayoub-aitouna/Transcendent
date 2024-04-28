import { navItem, SocialItem, SocialBtnType, TournamentsItem } from "@/type/dashboard/navitem";
import Home from "@/app/ui/dashboard/icons/nav/home";
import Tournaments from "@/app/ui/dashboard/icons/nav/turnement";
import Ranking from "@/app/ui/dashboard/icons/nav/ranking";
import twitch from "@/app/ui/dashboard/icons/nav/twitch";
import Intra from "@/app/ui/dashboard/icons/nav/intra";
import Discord from "@/app/ui/dashboard/icons/nav/discord";
import Notification from "@/app/ui/dashboard/icons/nav/notification";



export const navLinks: navItem[] = [
	{
		name: 'Home',
		href: '/home',
		Icon: Home
	},
	{
		name: 'Tournaments',
		href: '/tournaments',
		Icon: Tournaments
	},
	{
		name: 'Ranking',
		href: '/ranking',
		Icon: Ranking
	},
];

export const socialLinks: SocialItem[] = [
	{

		href: 'https://profile.intra.42.fr/',
		Icon: Intra,
		type: SocialBtnType.link
	},
	{
		href: 'https://www.twitch.tv/',
		Icon: twitch,
		type: SocialBtnType.link
	},
	{
		href: 'https://discord.com/',
		Icon: Discord,
		type: SocialBtnType.link
	},
	{
		href: '',
		Icon: Notification,
		type: SocialBtnType.btn
	},
];


export const tournamentLinks: TournamentsItem[] = [
	{

		href: '/assets/images/valorant.jpg',
		name: 'Valorant VCT cup 2024',
		followers: '64.9k',
		secName: 'Valorant'
	},
	{
		href: '/assets/images/lol.png',
		name: 'lEAGUE MASTERS  ',
		followers: '102.7k',
		secName: 'league of legends'
	},
	{
		href: '/assets/images/fortnait.jpg',
		name: 'Fortnite MASTERS',
		followers: '34.9k',
		secName: 'Fortnite S14'
	},
];
