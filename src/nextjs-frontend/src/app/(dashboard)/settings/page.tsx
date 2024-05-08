import React from "react";
import Input from "@/app/ui/auth/input";
import clsx from "clsx";
import Link from "next/link";
import RightArrow from "@/app/ui/dashboard/icons/right-arrow";
import UploadButton from "@/app/ui/dashboard/Upload-Button";
import ToggleSwitch from "@/app/ui/dashboard/Toggle-switch";

function ToggleOption({ title, desc }: { title: string; desc: string }) {
	return (
		<div className='flex flex-row justify-between items-center p-2'>
			<div className='flex flex-col items-start justify-center gap-2'>
				<h6 className='text-lg font-semibold tracking-wide'>{title}</h6>
				<p className='text-[#94969C] font-light text-sm'>{desc}</p>
			</div>
			<ToggleSwitch />
		</div>
	);
}

function OptionLink({
	title,
	desc,
	danger = false,
	href,
}: {
	title: string;
	desc: string;
	href?: string;
	danger?: boolean;
}) {
	return (
		<Link
			href={href ? href : "/"}
			nonce="option-link"
			className='flex flex-row justify-between items-center p-2'>
			<div className='flex flex-col items-start justify-center gap-2'>
				<h6
					className={clsx("text-lg font-semibold tracking-wide", {
						"text-[#9C2828]": danger === true,
					})}>
					{title}
				</h6>
				<p
					className={clsx(`text-[#94969C] font-light text-sm `, {
						"text-[#9C2828]": danger === true,
					})}>
					{desc}
				</p>
			</div>
			<RightArrow color={danger ? "#9C2828" : "#ffffff"} />
		</Link>
	);
}

const Wrapper = ({
	title,
	desc,
	children,
}: {
	title: string;
	desc: string;
	children: React.ReactNode;
}) => {
	return (
		<>
			<div className=' w-fit flex flex-col gap-3'>
				<div className='flex flex-col gap-2 py-3'>
					<h6 className='text-lg font-bold text-white'>{title}</h6>
					<p className='text-[14px] text-[#a2a2a2]'>{desc}</p>
				</div>
				<div className='w-[640px] rounded-lg bg-black min-h-[408px]'>
					{children}
				</div>
			</div>
		</>
	);
};

const page = () => {
	return (
		<div className='w-full flex flex-col items-center gap-6 py-10  h-full max-h-[87vh] overflow-y-scroll hide-scrollbar'>
			<Wrapper
				title='Personal Info'
				desc='Upload your photo and personal details here.'>
				<div className='flex flex-col gap-6 p-6'>
					<UploadButton />
					<div className='flex flex-row gap-6'>
						<Input
							type='text'
							title='First Name'
							name='firstname'
							placeholder='Ayoub'
							error={false}
							additionalStyles='rounded'
							helperText={null}
							register={null}
						/>
						<Input
							type='text'
							title='Last Name'
							name='lastname'
							placeholder='Aitouna'
							additionalStyles='rounded'
							error={false}
							helperText={null}
							register={null}
						/>
					</div>
					<Input
						type='text'
						title='Username'
						name='Username'
						placeholder='@aaitouna'
						additionalStyles='rounded'
						error={false}
						helperText={null}
						register={null}
					/>
					<div className='flex-1 flex flex-row items-end justify-end gap-3 p-1'>
						<button className='h-9 w-24 grid place-content-center text-sm font-semibold rounded bg-secondary-300'>
							Cancel
						</button>
						<button className='primary-gradient h-9 w-36 grid place-content-center text-sm font-semibold rounded'>
							Save Changes
						</button>
					</div>
				</div>
			</Wrapper>
			<Wrapper
				title='Account security'
				desc='Manage your account and customize settings'>
				<div className='flex flex-col gap-6 p-6'>
					<div className='flex flex-row items-end gap-3'>
						<Input
							type='email'
							title='Email'
							name='email'
							placeholder='Aitounayoub05@gmail.com'
							error={false}
							additionalStyles='rounded'
							helperText={null}
							register={null}
						/>
						<button
							className='h-10 w-40 mb-1 grid place-content-center text-sm p-3
											rounded bg-secondary-300'>
							Change Email
						</button>
					</div>
					<ToggleOption
						title='2-Step verification'
						desc='Add an additional Layer of security to your account during login'
					/>
					<ToggleOption
						title='Desktop Notification'
						desc='Receive desktop notifications for critical events.'
					/>
					<OptionLink
						title='Blocklist'
						href='/settings/block-list'
						desc='list of all users that you have blocked'
					/>
					<OptionLink
						title='Log out all devices'
						desc='log out pf all connected devices'
						danger
					/>
				</div>
			</Wrapper>
			<Wrapper
				title='Password'
				desc='Please enter your current password to change your password.'>
				<div className='flex flex-col gap-6 p-6'>
					<Input
						type='password'
						title='Current password'
						name='currentPassword'
						placeholder='********'
						additionalStyles='rounded'
						error={false}
						helperText={null}
						register={null}
					/>
					<div className='flex flex-col gap-2'>
						<Input
							type='password'
							title='New password'
							name='Password'
							placeholder='********'
							additionalStyles='rounded'
							error={false}
							helperText={null}
							register={null}
						/>
						<p className='text-[#94969C] font-light text-sm'>
							Your new password must be more than 8 characters.
						</p>
					</div>

					<Input
						type='password'
						title='Confirm new password'
						name='ConfirmPassword'
						placeholder='********'
						additionalStyles='rounded'
						error={false}
						helperText={null}
						register={null}
					/>
					<div className='flex-1 flex flex-row items-end justify-end gap-3 p-1'>
						<button className='h-9 w-24 grid place-content-center text-sm font-semibold rounded bg-secondary-300'>
							Cancel
						</button>
						<button className='primary-gradient h-9 w-36 grid place-content-center text-sm font-semibold rounded'>
							Update password
						</button>
					</div>
				</div>
			</Wrapper>
		</div>
	);
};

export default page;
