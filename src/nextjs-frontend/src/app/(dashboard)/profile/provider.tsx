"use client";
import React, { useEffect, useLayoutEffect } from "react";
import { useAppSelector } from "@/redux/store";
import { redirect, usePathname } from "next/navigation";

export default function Provider({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	const path = usePathname();
	const id = path.split("/")[2];
	const user = useAppSelector((state) => state.user);

	useEffect(() => {
		if (id === user.user.id.toString()) redirect("/profile/me");
	}, [user]);

	return children;
}
