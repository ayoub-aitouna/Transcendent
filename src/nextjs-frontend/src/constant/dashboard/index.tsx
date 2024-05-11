import {
	navItem,
	SocialItem,
	SocialBtnType,
	TournamentsItem,
	NotificationItem,
	MessengerItem,
	MessagesItem,
} from "@/type/dashboard/navitem";
import Home from "@/app/ui/dashboard/icons/nav/home";
import Tournaments from "@/app/ui/dashboard/icons/nav/turnement";
import Ranking from "@/app/ui/dashboard/icons/nav/ranking";
import twitch from "@/app/ui/dashboard/icons/nav/twitch";
import Intra from "@/app/ui/dashboard/icons/nav/intra";
import Discord from "@/app/ui/dashboard/icons/nav/discord";
import Notification from "@/app/ui/dashboard/icons/nav/notification";
import { Achievement } from "@/type/dashboard";
import { number } from "yup";

export const navLinks: navItem[] = [
	{
		name: "Home",
		href: "/home",
		Icon: Home,
	},
	{
		name: "Tournaments",
		href: "/tournaments",
		Icon: Tournaments,
	},
	{
		name: "Ranking",
		href: "/ranking",
		Icon: Ranking,
	},
];

export const socialLinks: SocialItem[] = [
	{
		href: "https://profile.intra.42.fr/",
		Icon: Intra,
		type: SocialBtnType.link,
	},
	{
		href: "https://www.twitch.tv/",
		Icon: twitch,
		type: SocialBtnType.link,
	},
	{
		href: "https://discord.com/",
		Icon: Discord,
		type: SocialBtnType.link,
	},
	{
		href: "",
		Icon: Notification,
		type: SocialBtnType.btn,
	},
];

export const tournamentLinks: TournamentsItem[] = [
	{
		href: "/assets/images/valorantlogo.png",
		name: "Valorant VCT cup 2024",
		followers: "64.9k",
		secName: "Valorant",
	},
	{
		href: "/assets/images/lol.png",
		name: "lEAGUE MASTERS  ",
		followers: "102.7k",
		secName: "league of legends",
	},
	{
		href: "/assets/images/fortnait.jpg",
		name: "Fortnite MASTERS",
		followers: "34.9k",
		secName: "Fortnite S14",
	},
];


export const MessengerLinks: MessengerItem[] = [
	{
		href: "/assets/images/girl.png",
		name: "kmahdi",
		LastMessage: "chat number 1 ?",
		time: "20.50",
		messagesNbr: 4,
	},
	{
		href: "/assets/images/profile.jpg",
		name: "icybrilliant",
		LastMessage: "chat number 2 ?",
		time: "20.50",
		messagesNbr: 0,
	},
	{
		href: "/assets/images/kmahdi.jpg",
		name: "yscr",
		LastMessage: "chat number 3 ?",
		time: "20.50",
		messagesNbr: 0,
	},
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 4 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 5 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 6 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0,
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 7 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 8 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 9 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0,
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 10 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 11 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 12 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0,
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 13 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 14 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 15 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0,
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 16 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 17 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 18 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0,
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 19 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 20 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 21 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0,
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 22 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 23 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 24 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0,
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 25 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 26 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0
	// },
	// {
	// 	href: "/assets/images/profile.jpg",
	// 	name: "kmahdi",
	// 	LastMessage: "chat number 27 ?",
	// 	time: "20.50",
	// 	messagesNbr: 0,
	// },
];

export const Notifications: NotificationItem[] = [
	{
		notification:
			"Android Developers uploaded: Android Developer Story: Google Drive cut code and development time in half with Compose",
		time: "2 hours ago",
	},
	{
		notification: "Eric invited you into a game of pingpong",
		time: "1 hour ago",
	},
	{
		notification: "Aya invited you to join a Team",
		time: "15 hours ago",
	},
	{
		notification: "New Message from kmahdi",
		time: "15 hours ago",
	},
	{
		notification: "New Message from aaitouna",
		time: "15 hours ago",
	},
	{
		notification: "New Message from kmahdi",
		time: "15 hours ago",
	},
	{
		notification: "New Message from aaitouna",
		time: "15 hours ago",
	},
	{
		notification: "New Message from kmahdi",
		time: "15 hours ago",
	},
	{
		notification: "New Message from aaitouna",
		time: "15 hours ago",
	},
	{
		notification:
			"Android Developers uploaded: Android Developer Story: Google Drive cut code and development time in half with Compose",
		time: "2 hours ago",
	},
	{
		notification:
			"Android Developers uploaded: Android Developer Story: Google Drive cut code and development time in half with Compose",
		time: "2 hours ago",
	},
	{
		notification:
			"Android Developers uploaded: Android Developer Story: Google Drive cut code and development time in half with Compose",
		time: "2 hours ago",
	},
];



export const BracketData = [
	[
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
	],
	[
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
	],
	[
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "ooussama",
				level: 100,
			},
		},
	],
	[
		{
			player1: {
				image_url: "/assets/images/profile.jpg",
				username: "aaitouna",
				level: 50,
			},
		},
	],
];

export const StreamingData = [
	{
		user1: {
			image_url: "/assets/images/profile.jpg",
			username: "aaitounaasdadasd",
			level: 50,
		},
		user2: {
			image_url: "/assets/images/profile.jpg",
			username: "ooussama",
			level: 100,
		},
	},
	{
		user1: {
			image_url: "/assets/images/profile.jpg",
			username: "aaitouna",
			level: 50,
		},
		user2: {
			image_url: "/assets/images/profile.jpg",
			username: "ooussama",
			level: 100,
		},
	},
	{
		user1: {
			image_url: "/assets/images/profile.jpg",
			username: "aaitouna",
			level: 50,
		},
		user2: {
			image_url: "/assets/images/profile.jpg",
			username: "ooussama",
			level: 100,
		},
	},
	{
		user1: {
			image_url: "/assets/images/profile.jpg",
			username: "aaitouna",
			level: 50,
		},
		user2: {
			image_url: "/assets/images/profile.jpg",
			username: "ooussama",
			level: 100,
		},
	},
];

export const TopAchievementsList: Achievement[] = [
	{
		icon: "/assets/badges/Mars-2020-Contributor.png",
		name: "Decathlon Dominator",
		description: "Secure a streak of 10 victorious games in a row.",
	},
	{
		icon: "/assets/badges/OpenSourcerer.png",
		name: "Wizard's Triumph",
		description:
			"Master the art of the game by winning a match using only curve shots, leaving your opponent spellbound.",
	},
	{
		icon: "/assets/badges/HeartOnYourSleeve.png",
		name: "Survival Specialist",
		description:
			"Achieve a perfect win in a game of ping pong without conceding a single point.",
	},
];

export const UserInfoList = [
	{
		src: "/assets/icons/fluent_games.png",
		value: "+212 6 36 04 78 60",
	},
	{
		src: "/assets/icons/email.png",
		value: "Aitounaayoub@gmail.com",
	},
	{
		src: "/assets/icons/location-filled.png",
		value: "Benguerir",
	},
	{
		src: "/assets/icons/connected.png",
		value: "Online",
	},
];

export const AllOnlinePlayers = [
	{
		href: "/assets/images/kmahdi.jpg",
		name: "kmahdi",
		number: 6,
	},
	{
		name: "Aaitouna",
		href: "/assets/images/aaitouna.jpg",
		number: 254,
	},
	{
		href: "/assets/images/girl.png",
		name: "scrums",
		number: 128,
	},
	{
		href: "/assets/images/profile.jpg",
		name: "icybrilliant",
		number: 112,
	},
	{
		name: "kmahdi",
		href: "/assets/images/profile.jpg",
		number: 855,
	},
	{
		href: "/assets/images/kmahdi.jpg",
		name: "kmahdi",
		number: 6,
	},
	{
		name: "Aaitouna",
		href: "/assets/images/aaitouna.jpg",
		number: 254,
	},
	{
		href: "/assets/images/girl.png",
		name: "scrums",
		number: 128,
	},
	{
		href: "/assets/images/profile.jpg",
		name: "icybrilliant",
		number: 112,
	},
	{
		name: "kmahdi",
		href: "/assets/images/profile.jpg",
		number: 855,
	},
	{
		href: "/assets/images/kmahdi.jpg",
		name: "kmahdi",
		number: 6,
	},
	{
		name: "Aaitouna",
		href: "/assets/images/aaitouna.jpg",
		number: 254,
	},
	{
		href: "/assets/images/girl.png",
		name: "scrums",
		number: 128,
	},
	{
		href: "/assets/images/profile.jpg",
		name: "icybrilliant",
		number: 112,
	},
	{
		name: "kmahdi",
		href: "/assets/images/profile.jpg",
		number: 855,
	},

]

export const Messages: MessagesItem[] = [
	{
		message:
			"Android Developers uploaded: Android Developer Story: Google Drive cut code and development time in half with Compose",
		time: "2 hours ago",
	},
	{
		message: "Eric invited you into a game of pingpong",
		time: "1 hour ago",
	},
	{
		message: "Aya invited you to join a Team",
		time: "15 hours ago",
	},
	{
		message: "New Message from kmahdi",
		time: "15 hours ago",
	},
	{
		message: "New Message from aaitouna",
		time: "15 hours ago",
	},
];
