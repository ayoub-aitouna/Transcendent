import React, { SVGProps } from "react";

export type navItem = {
	name: string;
	Icon?: React.FC<SVGProps<SVGSVGElement>> | null;
	href: string;
};
export enum SocialBtnType{
	'link',
	'btn'
}

export type SocialItem = {
	Icon?: any;
	href: string;
	type: SocialBtnType;
}


export type TournamentsItem = {
	id?: number;
	href: string;
	name: string;
	followers: string;
	secName: string;
	// number: number;
}


export type NotificationItem = {
	notification: string;
	time: string;
}

export type MessengerItem = {
	name: string;
	href: string;
	LastMessage: string;
	time: string;
	messagesNbr:Number;
}
	