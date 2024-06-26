"use client";
import React from "react";
import FormWrapper from "./FormWrapper";
import Input from "@/app/ui/auth/input";
import { updateProfile } from "@/api/user";
import { UpdateUser } from "@/redux/slices/userslice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ToggleOption from "@/app/ui/dashboard/component/toggle-option";
import OptionLink from "@/app/ui/dashboard/component/option-link";
import NotificationToggler from "../components/notification-toggler";

const email_schema = yup
	.object()
	.shape({
		email: yup
			.string()
			.email("email invalid")
			.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email Format")
			.required("Email is required")
			.trim(),
	})
	.required();

const AccountSecurityFrom = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setError,
	} = useForm({ resolver: yupResolver(email_schema) });

	const updateSubmit = async (data: any) => {
		console.log("data", data);

		try {
			const res = await updateProfile(data);
			dispatch(UpdateUser(res));
			reset();
		} catch (err: any) {
			console.error(err);
			setError("email", {
				type: "costume",
				message: err.response?.data.message,
			});
		}
	};

	return (
		<FormWrapper
			title='Account security'
			desc='Manage your account and customize settings'>
			<div className='flex flex-col gap-6 p-6'>
				<form
					className='flex flex-row items-start gap-3'
					onSubmit={handleSubmit(updateSubmit)}>
					<Input
						type='email'
						title='Email'
						name='email'
						placeholder={user.user.email}
						error={errors.email ? true : false}
						additionalStyles='rounded'
						helperText={errors.email?.message}
						register={register}
					/>
					<div className='h-20 flex items-end'>
						<input
							value='Change Email'
							type='submit'
							className='h-10 w-40  grid place-content-center text-sm p-3
											rounded bg-secondary-300'
						/>
					</div>
				</form>

				<ToggleOption
					onCheck={(isChecked: boolean) => {
						updateSubmit({ enabled_2fa: isChecked });
					}}
					checked={user.user.enabled_2fa}
					title='2-Step verification'
					desc='Add an additional Layer of security to your account during login'
				/>
				<NotificationToggler />
				<OptionLink
					title='Blocklist'
					href='/settings/block-list'
					desc='list of all users that you have blocked'
				/>
				{/* TODO: broadcast cast ws logout message */}
				<OptionLink
					title='Log out all devices'
					desc='log out pf all connected devices'
					danger
				/>
			</div>
		</FormWrapper>
	);
};

export default AccountSecurityFrom;
