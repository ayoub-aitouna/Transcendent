"use client";
import React from "react";
import FormWrapper from "./FormWrapper";
import Input from "@/app/ui/auth/input";
import { UpdatePassword, updateProfile } from "@/api/user";
import { UpdateUser } from "@/redux/slices/userslice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ToggleOption from "@/app/ui/dashboard/component/toggle-option";
import OptionLink from "@/app/ui/dashboard/component/option-link";
import { current } from "@reduxjs/toolkit";
import { ChangePasswordForm } from "@/type/auth/user";

const schema = yup
	.object()
	.shape({
		old_password: yup.string().required("password is required"),
		new_password: yup
			.string()
			.min(8, "password must be at least 8 characters")
			.matches(/[a-z]/, "password must have at least one lowercase letter")
			.matches(/[A-Z]/, "password must have at least one uppercase letter")
			.matches(/\d/, "password must have at least one digit")
			.matches(
				/[!@#$%^&*]/,
				"password must have at least one special character"
			)
			.required("password is required"),
		confirmPassword: yup
			.string()
			.required("confirm password is required")
			.oneOf([yup.ref("new_password")], "password does not match"),
	})
	.required("all_fields_required");

function ChangePassword() {
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
		reset,
		setError,
		getValues,
	} = useForm({ resolver: yupResolver(schema) });

	const OnSubmit = async (data: ChangePasswordForm) => {
		try {
			await UpdatePassword(data);
			reset();
		} catch (err: any) {
			console.log(err.response.data.message);
			setError("old_password", {
				type: "costume",
				message: err.response.data.message,
			});
		}
	};
	return (
		<FormWrapper
			title='Password'
			desc='Please enter your current password to change your password.'>
			<form
				className='flex flex-col gap-6 p-6'
				onSubmit={handleSubmit(OnSubmit)}>
				<Input
					type='password'
					title='Current password'
					name='old_password'
					placeholder='********'
					additionalStyles='rounded'
					error={errors.old_password ? true : false}
					helperText={errors.old_password?.message}
					register={register}
				/>
				<div className='flex flex-col gap-2'>
					<Input
						type='password'
						title='New password'
						name='new_password'
						placeholder='********'
						additionalStyles='rounded'
						error={errors.new_password ? true : false}
						helperText={errors.new_password?.message}
						register={register}
					/>
				</div>

				<Input
					type='password'
					title='Confirm new password'
					name='confirmPassword'
					placeholder='********'
					additionalStyles='rounded'
					error={errors.confirmPassword ? true : false}
					helperText={errors.confirmPassword?.message}
					register={register}
				/>
				<div className='flex-1 flex flex-row items-end justify-end gap-3 p-1'>
					<input
						type='button'
						value='Cancel'
						onClick={() => reset()}
						className='h-9 w-24 grid place-content-center text-sm font-semibold rounded bg-secondary-300'
					/>
					<input
						type='submit'
						value='Update password'
						className='primary-gradient h-9 w-36 grid place-content-center text-sm font-semibold rounded'
					/>
				</div>
			</form>
		</FormWrapper>
	);
}

export default ChangePassword;
