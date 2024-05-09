import * as React from "react"
import { SVGProps } from "react"

const Order = (props: SVGProps<SVGSVGElement>) => (
	<svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={14}
    fill="none"
    viewBox="0 0 8 9"
    {...props}
  >
    <path
      fill="#fff"
      d="M5.5 8.44a.48.48 0 0 1-.145.415.498.498 0 0 1-.705 0L2.645 6.85a.495.495 0 0 1-.145-.415v-2.56L.105.81A.5.5 0 0 1 .19.11C.285.04.39 0 .5 0h7c.11 0 .215.04.31.11a.5.5 0 0 1 .085.7L5.5 3.875V8.44ZM1.52 1 3.5 3.53v2.76l1 1V3.525L6.48 1H1.52Z"
    />
  </svg>
)

export default Order
