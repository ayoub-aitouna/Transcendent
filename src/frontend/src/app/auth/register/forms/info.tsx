import React, { useState } from "react";
import Input from "@/app/ui/auth/input";
import AuthForm from "@/app/ui/auth/form";
import { useFormData } from "@/app/auth/register/context/FormProvider";
import { RegisterUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import { user } from "@/type/auth/user";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthApiResponse } from "@/type/auth/auth";
import LoadingIcon from "@/app/ui/icons/loading-icon";

const schema = yup.object().shape({
	username: yup
		.string()
		.min(4, "Username must be at least 4 characters")
		.max(15, "Username number must be at most 35 characters")
		.matches(/^[a-zA-Z0-9]+$/, {
			message: "Username must contain only letters and numbers",
		})
		.required("Username is required"),
	fullname: yup
		.string()
		.matches(/^[a-zA-Z]+ [a-zA-Z]+$/, {
			message: "Full name must contain Firsrname and Lastname",
		})
		.required("Full name is required"),
	password: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
});

const Info = () => {
	const router = useRouter();
	const { getFormValues } = useFormData();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: any) => {
		const user = {
			email: (getFormValues() && getFormValues().email) || null,
			password: data.password,
			username: data.username,
			first_name: data.fullname.split(" ")[0],
			last_name: data.fullname.split(" ")[1],
		} as user;
		try {
			const res: Partial<AuthApiResponse> = await RegisterUser({ ...user });
			router.replace("/");
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<AuthForm title='Your Information' onSubmit={handleSubmit(onSubmit)}>
			<Input
				name='username'
				type='text'
				title='Username'
				error={errors.username ? true : false}
				helperText={errors.username ? errors.username.message : null}
				placeholder='Jdoe'
				register={register}
			/>
			<Input
				name='fullname'
				type='text'
				title='Full name'
				error={errors.fullname ? true : false}
				helperText={errors.fullname ? errors.fullname.message : null}
				placeholder='john Doe'
				register={register}
			/>
			<Input
				name='password'
				type='password'
				title='Password'
				error={errors.password ? true : false}
				helperText={errors.password ? errors.password.message : null}
				placeholder='**********'
				register={register}
			/>
			<button
				type='submit'
				disabled={isSubmitting}
				className='w-[318px] h-[50px] bg-[#004E99] flex justify-center items-center gap-3'>
				{isSubmitting && <LoadingIcon fill='white' />}
				Continue
			</button>
		</AuthForm>
	);
};

export default Info;
