"use client";
import React from "react";
import Input from "@/app/ui/auth/input";
import PersonalInfoForm from "@/app/(dashboard)/settings/Forms/PersonalInfo";
import FormWrapper from "./Forms/FormWrapper";
import AccountSecurityFrom from "./Forms/AccountSecurity";
import ChangePassword from "./Forms/ChangePassword";


const page = () => {
	return (
		<div className='w-full flex flex-col items-center gap-6 py-10  h-fit hide-scrollbar'>
			<PersonalInfoForm />
			<AccountSecurityFrom />
			<ChangePassword />
		</div>
	);
};

export default page;
