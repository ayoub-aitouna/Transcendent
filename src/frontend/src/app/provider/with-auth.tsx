"use client";

import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProfileData } from "@/api/user";
import { Login } from "@/redux/slices/userslice";

export default function WithAuth({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	const [client, setClient] = useState(false);
	const cookies = parseCookies();
	const token = cookies.access;
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);

	useEffect(() => {
		setClient(true);
	}, []);
	const handleProfileData = async () => {
		try {
			const nookies = parseCookies();
			if (!nookies.access || !nookies.refresh) return;
			const user = await ProfileData();
			console.log("data", user);
			dispatch(
				Login({
					user: user,
					token: token,
					isAuth: true,
					isLoading: false,
					error: "",
				})
			);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (!client && !token) return;
		handleProfileData();
	}, [client]);

	return children;
}
