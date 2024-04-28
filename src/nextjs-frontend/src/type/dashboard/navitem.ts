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
	href: string;
	name: string;
	followers: string;
	secName: string;
	// number: number;
}