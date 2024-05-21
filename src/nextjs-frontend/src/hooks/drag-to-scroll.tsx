"use client";

import React, { useEffect, useState, useRef } from "react";

export const useDragToScroll = ():
	| React.RefObject<HTMLDivElement>
	| undefined => {
	const [isClient, setIsClient] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (!isClient) return;
		if (ref && !ref.current) return;
		const scrollContainer = ref.current;
		let isDown = false;
		let StartX: number, StartY: number;
		let scrollLeft: number, scrollTop: number;
		const handleMouseDown = (e: any) => {
			isDown = true;
			scrollContainer?.classList.add("grabbing");
			StartX = e.clientX - (scrollContainer?.offsetLeft || 0);
			StartY = e.clientY - (scrollContainer?.offsetTop || 0);
			scrollLeft = scrollContainer?.scrollLeft || 0;
			scrollTop = scrollContainer?.scrollTop || 0;
		};
		const handleMouseLeave = (e: any) => {
			isDown = false;
			scrollContainer?.classList.remove("grabbing");
		};

		const handleMouseUp = (e: any) => {
			isDown = false;
			scrollContainer?.classList.remove("grabbing");
		};

		const handleMouseMove = (e: any) => {
			if (!isDown) return;
			const x = e.clientX - (scrollContainer?.offsetLeft || 0);
			const y = e.clientY - (scrollContainer?.offsetTop || 0);
			const walkX = (x - StartX) * 1;
			const walkY = (y - StartY) * 1;
			if (scrollContainer) scrollContainer.scrollLeft = scrollLeft - walkX;
			if (scrollContainer) scrollContainer.scrollTop = scrollTop - walkY;
		};

		scrollContainer?.addEventListener("mousedown", handleMouseDown);
		scrollContainer?.addEventListener("mouseleave", handleMouseLeave);
		scrollContainer?.addEventListener("mouseup", handleMouseUp);
		scrollContainer?.addEventListener("mousemove", handleMouseMove);
		return () => {
			scrollContainer?.removeEventListener("mousedown", handleMouseDown);
			scrollContainer?.removeEventListener("mouseleave", handleMouseLeave);
			scrollContainer?.removeEventListener("mouseup", handleMouseUp);
			scrollContainer?.removeEventListener("mousemove", handleMouseMove);
		};
	}, [isClient, ref]);

	return ref;
};
