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
			fillOpacity={0.6}
			fillRule='evenodd'
			d='M4.33 4.782C2.5 6.615 2.5 9.56 2.5 15.452c0 5.893 0 8.839 1.83 10.669 1.832 1.831 4.777 1.831 10.67 1.831 5.892 0 8.839 0 10.669-1.831C27.5 24.292 27.5 21.345 27.5 15.452c0-5.892 0-8.839-1.831-10.67-1.829-1.83-4.777-1.83-10.669-1.83-5.893 0-8.839 0-10.67 1.83Zm17.64 8.77a.938.938 0 0 0-1.44-1.2l-2.246 2.695c-.463.556-.749.895-.983 1.106a.954.954 0 0 1-.203.153l-.014.006-.01-.005-.004-.001a.962.962 0 0 1-.205-.153c-.234-.212-.519-.55-.982-1.106l-.365-.438c-.41-.493-.782-.937-1.127-1.25-.376-.34-.85-.642-1.475-.642-.625 0-1.097.303-1.475.643-.345.312-.715.756-1.125 1.25L8.03 17.352a.938.938 0 0 0 1.441 1.2l2.246-2.695c.463-.556.749-.895.983-1.106.06-.06.13-.111.204-.153l.008-.004.005-.002.014.006a.955.955 0 0 1 .205.153c.234.212.519.55.982 1.106l.365.438c.412.493.782.937 1.127 1.25.376.34.85.642 1.475.642.625 0 1.097-.303 1.475-.643.345-.312.715-.756 1.125-1.25l2.286-2.742Z'
			clipRule='evenodd'
		/>
	</svg>
);
export default SvgComponent;
