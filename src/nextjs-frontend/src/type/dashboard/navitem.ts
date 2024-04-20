import React, { SVGProps } from "react";

export type navItem = {
	title: string;
	Icon?: React.FC<SVGProps<SVGSVGElement>> | null;
	href: string;
};
