import * as React from "react"
import { SVGProps } from "react"

const NameOrder = ({ color }: { color: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={12}
        height={16}
        fill="none"
    >
        <path
            stroke={color}
            strokeWidth={0.833}
            d="M9.75 1.333h-7.5c-.828 0-1.5.738-1.5 1.647v10.706c0 .91.672 1.647 1.5 1.647h7.5c.828 0 1.5-.737 1.5-1.647V2.98c0-.91-.672-1.647-1.5-1.647Z"
        />
        <path
            stroke={color}
            strokeLinecap="round"
            strokeWidth={0.833}
            d="M3.75 5.45h4.5m-4.5 3.295h4.5m-4.5 3.294h3"
        />
    </svg>
);

export default NameOrder;

