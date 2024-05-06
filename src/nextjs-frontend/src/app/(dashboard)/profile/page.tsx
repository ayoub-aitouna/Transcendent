
'use client'
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";

const page = () => {
	const user = useAppSelector((state) => state.user);
	console.log('User', user.user);
	redirect(`/profile/${user.user.username || "username"}`);
};

export default page;
