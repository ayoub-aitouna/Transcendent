import React from "react";
import FormWrapper from "./FormWrapper";
import Input from "@/app/ui/auth/input";
import UploadButton from "@/app/ui/dashboard/component/Upload-Button";
import { updateProfile } from "@/api/user";
import { UpdateUser } from "@/redux/slices/userslice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/redux/store";

const personal_info_schema = yup
	.object()
	.shape({
		image_file: yup.mixed().notRequired(),
		first_name: yup.string().trim().notRequired(),
		last_name: yup.string().trim().notRequired(),
		username: yup.string().trim().notRequired(),
	})
	.required();

const PersonalInfoForm = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const {
		register: registerPersonalInfo,
		handleSubmit: handlePersonalInfoSubmit,
		formState: { errors: personalInfoErrors, isSubmitting },
		watch,
		setError: setErrorPersonalInfo,
		setValue: setValuePersonalInfo,
		reset: resetPersonalInfo,
	} = useForm({
		resolver: yupResolver(personal_info_schema),
	});

	const ResetPersonalInfoForm = () => {
		resetPersonalInfo();
		setValuePersonalInfo("image_file", null);
	};

	const onPersonalInfoUpdate = async (data: any) => {
		const { image_file, firstname, lastname, username } = data;
		if (!image_file && !firstname && !lastname && !username) {
			setErrorPersonalInfo("image_file", {
				type: "manual",
				message: "At least one field is required",
			});

			return;
		}
		try {
			const res = await updateProfile({
				image_file,
				first_name: firstname,
				last_name: lastname,
				username: username,
			});
			dispatch(UpdateUser(res));
		} catch (err: any) {
			setErrorPersonalInfo("image_file", {
				type: "manual",
				message: err.response.data.message,
			});
		}
		ResetPersonalInfoForm();
	};
	return (
		<FormWrapper
			title='Personal Info'
			desc='Upload your photo and personal details here.'>
			<form
				className='flex flex-col gap-6 p-6'
				onSubmit={handlePersonalInfoSubmit(onPersonalInfoUpdate)}>
				<UploadButton
					error={personalInfoErrors.image_file ? true : false}
					helperText={personalInfoErrors.image_file?.message}
					setValue={setValuePersonalInfo}
					clear={!watch("image_file")}
				/>

				<div className='flex flex-row gap-6'>
					<Input
						type='text'
						title='First Name'
						name='firstname'
						placeholder={user.user.first_name}
						error={personalInfoErrors.first_name ? true : false}
						additionalStyles='rounded'
						helperText={personalInfoErrors.first_name?.message}
						register={registerPersonalInfo}
					/>
					<Input
						type='text'
						title='Last Name'
						name='lastname'
						placeholder={user.user.last_name}
						additionalStyles='rounded'
						error={personalInfoErrors.last_name ? true : false}
						helperText={personalInfoErrors.last_name?.message}
						register={registerPersonalInfo}
					/>
				</div>
				<Input
					type='text'
					title='Username'
					name='Username'
					placeholder={`@${user.user.username}`}
					additionalStyles='rounded'
					error={personalInfoErrors.username ? true : false}
					helperText={personalInfoErrors.username?.message}
					register={registerPersonalInfo}
				/>
				<div className='flex-1 flex flex-row items-end justify-end gap-3 p-1'>
					<input
						onClick={() => ResetPersonalInfoForm()}
						type='button'
						value='Cancel'
						className='h-9 w-24 grid place-content-center text-sm font-semibold rounded bg-secondary-300'
					/>
					<input
						disabled={isSubmitting}
						type='submit'
						className='primary-gradient h-9 w-36 grid place-content-center text-sm font-semibold rounded'
						value='Save Changes'
					/>
				</div>
			</form>
		</FormWrapper>
	);
};

export default PersonalInfoForm;
