'use client'
import React from 'react'
import Info from './forms/info'
import Register from './forms/register'
import Verify from './forms/verify'
import FormProvider from '@/app/auth/register/context/FormProvider'

const page = () => {
  const [currentForm, setCurrentForm] = React.useState<number>(0);
  const NextStep = () => setCurrentForm(prev => prev + 1)
  const FormElements = [
    <Register NextStep={NextStep} />,
    <Verify NextStep={NextStep} />,
    <Info />,
  ]
  return (
    <FormProvider>
      <div className='flex justify-center items-center w-full h-full'>
        {FormElements[currentForm]}
      </div>
    </FormProvider >

  )
}

export default page