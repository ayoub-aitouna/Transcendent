import * as React from "react"

const LogOut = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={14}
		height={14}
		fill="none"
		{...props}
	>
		<path
			stroke="#A2A2A2"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M7 7h4.083m0 0-1.75 1.75M11.083 7l-1.75-1.75m1.75-1.75v-.583A1.167 1.167 0 0 0 9.917 1.75H4.083a1.167 1.167 0 0 0-1.166 1.167v8.166a1.167 1.167 0 0 0 1.166 1.167h5.834a1.167 1.167 0 0 0 1.166-1.167V10.5"
		/>
	</svg>
)
export default LogOut 