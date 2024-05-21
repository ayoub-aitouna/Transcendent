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
			const data = await ProfileData();
			dispatch(
				Login({
					user: data,
					token: token,
					isAuth: true,
					isLoading: false,
					error: "",
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!client && !token) return;
		handleProfileData();
	}, [client]);

	return children;
}
