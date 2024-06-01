import * as React from "react"
import { SVGProps } from "react"
const Filter = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		fill="none"
		{...props}
	>
		<path
			stroke="#fff"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M10.438 16.593h-6.3M13.248 6.9h6.3"
		/>
		<path
			stroke="#fff"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M8.834 6.846A2.355 2.355 0 0 0 6.471 4.5a2.355 2.355 0 0 0-2.363 2.346A2.355 2.355 0 0 0 6.47 9.193a2.355 2.355 0 0 0 2.363-2.347ZM20.108 16.554a2.354 2.354 0 0 0-2.363-2.346 2.355 2.355 0 0 0-2.364 2.346 2.355 2.355 0 0 0 2.364 2.346 2.354 2.354 0 0 0 2.363-2.346Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default Filter
