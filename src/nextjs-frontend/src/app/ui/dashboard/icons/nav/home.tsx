import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={30}
		height={31}
		fill={props.fill || "#000"}
		{...props}>
		<path
			fill={props.fill || "#000"}
			fillOpacity={0.8}
			d='M12.5 25.452v-7.5h5v7.5h6.25v-10h3.75L15 4.202 2.5 15.452h3.75v10h6.25Z'
		/>
	</svg>
);
export default SvgComponent;
