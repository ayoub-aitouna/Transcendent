"use client";
import React from "react";
import OAuthentication2 from "@/app/ui/auth/OAuthentication2";
import Image from "next/image";
import Input from "@/app/ui/auth/input";
import AuthForm from "@/app/ui/auth/form";
import { useFormData } from "@/app/auth/register/context/FormProvider";
import { RegisterEmail } from "@/api/auth";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { oauth2Providers } from "@/constant/Auth";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email format")
		.required("Email is required"),
});

const Register = ({ NextStep }: { NextStep: () => void }) => {
	const { setFormValues } = useFormData();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: { email: string }) => {
		try {
			const res = await RegisterEmail({ ...data });
			setFormValues({ email: data.email });
			NextStep();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<AuthForm title='Join Transcendent' onSubmit={handleSubmit(onSubmit)}>
			<div className='felx-1 flex w-full flex-col gap-[7px] '>
				<OAuthentication2 {...oauth2Providers[0]}>
					<div
						className='flex-1 flex flex-row items-center justify-start
                        gap-[20px] rounded-[2px] outline outline-[1px] outline-[#a2a2a2] h-[50px] px-[12px] py-[10px]'>
						<div className='h-[30px] aspect-square  grid place-content-center'>
							<Image src='/assets/google.svg' width={30} height={30} alt='' />
						</div>
						<p className='text-[14px] text-[#a2a2a2]'>Sign in with Google</p>
					</div>
				</OAuthentication2>
				<OAuthentication2 {...oauth2Providers[1]}>
					<div
						className='flex-1 flex flex-row items-center justify-start
                        gap-[20px] rounded-[2px] outline outline-[1px] outline-[#a2a2a2] h-[50px] px-[12px] py-[10px]'>
						<div className='h-[30px] aspect-square bg-black rounded-full grid place-content-center'>
							<Image src='/assets/42_logo.svg' width={20} height={20} alt='' />
						</div>
						<p className='text-[14px] text-[#a2a2a2]'>Sign in with Intra</p>
					</div>
				</OAuthentication2>
			</div>

			<div className='flex flex-row items-center justify-center w-full h-2 gap-[20px]'>
				<div className='w-[130px] bg-[#D9D9D9] h-[1px] rounded-full'></div>
				<p className='text-[10px] font-light'>OR</p>
				<div className='w-[130px] bg-[#D9D9D9] h-[1px] rounded-full'></div>
			</div>
			<Input
				type='email'
				title='Email address'
				name='email'
				placeholder='john@gmail.com'
				error={errors.email ? true : false}
				helperText={errors.email ? errors.email.message : null}
				register={register}
			/>
			<button type='submit' className='w-[318px] h-[50px] bg-[#004E99]'>
				Continue
			</button>
		</AuthForm>
	);
};

export default Register;
