import React from 'react'
import * as yup from "yup";
import OtpInput from "react18-input-otp";
import AuthForm from '@/app/ui/auth/form'
import { VerifyEmail } from '@/api/auth'
import { useFormData } from '@/app/auth/register/context/FormProvider'

type validation = {
  value: string;
  error?: string | null;
};

const schema = yup.object().shape({
  otp: yup.string().required().length(5, "Must be exactly 5 digits"),
});

const verify = ({ NextStep }: { NextStep: () => void }) => {
  const { getFormValues } = useFormData()

  const [otp, setOtp] = React.useState<validation>({ value: '' });
 
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const email = getFormValues().email;
    console.log(email);
    try {
      const data = VerifyEmail({ email, code: otp.value })
      NextStep()
    } catch (e) {
      console.log(e);
    }
  }

  const handleInputChange = (value: string) => {
    setOtp((prev) => ({
      ...prev,
      value,
      error: null,
    }));
  }

  return (
    <AuthForm title='Verify Email' onSubmit={handleSubmit}>
      <div className="flex min-h-16 flex-col items-center justify-center mx-auto w-full max-w-xs  gap-[10px] ">
        <p className='text-[#a2a2a2] text-[14px]'>Enter the Verification Code</p>
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
      <button type="submit" className='w-[318px] h-[50px] bg-[#004E99]'>Continue</button>
    </AuthForm>
  )
}

export default verify