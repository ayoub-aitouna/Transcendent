import * as React from "react"
import { SVGProps } from "react"
const RightArrow = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={25}
		height={25}
		fill="none"
		{...props}
	>
		<path
			stroke="#fff"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="m9 5.5 7 7-7 7"
		/>
	</svg>
)
export default RightArrow