import React from "react";
import * as yup from "yup";
import OtpInput from "react18-input-otp";
import AuthForm from "@/app/ui/auth/form";
import { VerifyEmail } from "@/api/auth";
import { useFormData } from "@/app/auth/register/context/FormProvider";
import LoadingIcon from "@/app/ui/icons/loading-icon";

type validation = {
	value: string;
	error?: string | null;
};

const schema = yup.object().shape({
	otp: yup.string().required().length(5, "Must be exactly 5 digits"),
});

const verify = ({ NextStep }: { NextStep: () => void }) => {
	const { getFormValues } = useFormData();

	const [otp, setOtp] = React.useState<validation>({ value: "" });
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const email = getFormValues().email;
		try {
			setIsSubmitting(true);
			await VerifyEmail({ email, code: otp.value });
			NextStep();
		} catch (e: any) {
			console.log(e);
			setOtp((prev) => ({
				...prev,
				error: e?.response?.data?.detail || "An error occurred",
			}));
		}
		setIsSubmitting(false);
	};

	const handleInputChange = (value: string) => {
		setOtp((prev) => ({
			...prev,
			value,
			error: null,
		}));
	};

	return (
		<AuthForm title='Verify Email' onSubmit={handleSubmit}>
			<div className='flex min-h-16 flex-col items-center justify-center mx-auto w-full max-w-xs  gap-[10px] '>
				<p className='text-[#a2a2a2] text-[14px]'>
					Enter the Verification Code
				</p>
				<OtpInput
					inputStyle={{
						width: "60px",
						height: "47px",
						borderRadius: "2px",
						backgroundColor: "#464646",
						margin: "0 5px",
					}}
					hasErrored={otp.error !== undefined && otp.error !== null}
					errorStyle={{
						border: "1px solid #ff0000",
					}}
					isInputNum={true}
					numInputs={4}
					value={otp.value}
					onChange={handleInputChange}
				/>
			</div>
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

export default verify;
