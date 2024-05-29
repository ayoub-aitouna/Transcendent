import * as React from "react";
import { SVGProps } from "react";
const LoadingIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} {...props}>
		<style>{"@keyframes spinner_jgYN{to{transform:rotate(360deg)}}"}</style>
		<path
			d='M2 12A11.2 11.2 0 0 1 13 1.05C12.67 1 12.34 1 12 1a11 11 0 0 0 0 22c.34 0 .67 0 1-.05C6 23 2 17.74 2 12Z'
			style={{
				transformOrigin: "center",
				animation: "spinner_jgYN .6s linear infinite",
			}}
		/>
	</svg>
);
export default LoadingIcon;
