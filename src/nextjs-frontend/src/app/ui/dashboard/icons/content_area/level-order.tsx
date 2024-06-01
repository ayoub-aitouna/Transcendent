import * as React from "react"
import { SVGProps } from "react"

const LevelOrder = ({ color }: { color: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={13}
        fill="none"
    >
        <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.833}
            d="m7.667 12.5-7-7.833L2.66.5h10.014l1.993 4.167-7 7.833Z"
        />
        <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.833}
            d="m10.467 4.5-2.8 3-2.8-3"
        />
    </svg>
);

export default LevelOrder;

