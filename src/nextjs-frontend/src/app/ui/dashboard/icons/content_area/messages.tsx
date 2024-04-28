import * as React from "react"
import { SVGProps } from "react"
const Messages = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={1.5}
      d="M18.548 18.523a9.193 9.193 0 0 1-6.723 2.7c-3.295-.07-9.075-.019-9.075-.019s.05-5.847.048-9.2a9.191 9.191 0 0 1 2.704-6.53c3.599-3.6 9.447-3.6 13.046 0 3.606 3.606 3.6 9.449 0 13.049Z"
      clipRule="evenodd"
    />
    <path
      stroke="#fff"
      strokeLinecap="square"
      strokeWidth={1.5}
      d="M8.315 12.38h-.1M12.049 12.38h-.099M15.783 12.38h-.098"
    />
  </svg>
)
export default Messages
