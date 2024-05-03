"use client";
import React, { useEffect } from "react";
import OAuthentication2 from "@/app/ui/auth/OAuthentication2";
import Image from "next/image";
import Input from "@/app/ui/auth/input";
import AuthForm from "../ui/auth/form";
import { useSearchParams, useRouter } from "next/navigation";
import { LoginUser, HandleSocialAuth } from "@/api/auth";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { oauth2Providers } from "@/constant/Auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Login } from "@/redux/slices/userslice";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
});

const page = () => {
	const params = useSearchParams();
	const router = useRouter();
	const Dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const handleSocialAuth = async (provider: any) => {
		try {
			const res: any = await HandleSocialAuth({
				provider: provider,
				params: location.search,
			});
			console.log(res);
			Dispatch(
				Login({
					user: res.user,
					token: res.token,
					isAuth: true,
					isLoading: false,
					error: "",
				})
			);
			router.replace("/");
		} catch (error: any) {
			console.log(error?.response?.data);
		}
	};

	const onSubmit = async (data: any) => {
		try {
			const res: any = await LoginUser({ ...data });
			Dispatch(
				Login({
					user: res.user,
					token: res.token,
					isAuth: true,
					isLoading: false,
					error: "",
				})
			);
			router.replace("/");
		} catch (error: any) {
			setError("root", {
				type: "manual",
				message: error?.response?.data?.detail,
			});
		}
	};

	useEffect(() => {
		const code = params.get("code");
		const provider = params.get("state");
		if (code) {
			handleSocialAuth(provider);
		}
	}, []);

	return (
		<div className='flex justify-center items-center w-full h-full'>
			<AuthForm
				title='Join Transcendent'
				error={errors.root ? true : false}
				error_message={errors.root ? errors.root.message : null}
				onSubmit={handleSubmit(onSubmit)}>
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
								<Image
									src='/assets/42_logo.svg'
									width={20}
									height={20}
									alt=''
								/>
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
				<Input
					name='password'
					type='password'
					title='Password'
					error={errors.password ? true : false}
					helperText={errors.password ? errors.password.message : null}
					placeholder='**********'
					register={register}
				/>
				<button type='submit' className='w-[318px] h-[50px] bg-[#004E99]'>
					Sing in
				</button>
			</AuthForm>
		</div>
	);
};

export default page;
