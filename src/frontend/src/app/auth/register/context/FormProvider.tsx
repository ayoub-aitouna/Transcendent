import { create } from "domain";
import { useState, createContext, useContext } from "react";

const FormContext = createContext<any>(null);

type FormContextType = {
	email: string;
	username: string;
	password: string;
	otp: string;
};

const FormProvider = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const [form, setForm] = useState<FormContextType>();

	const setFormValues = (values: Partial<FormContextType>) => {
		setForm((prevValues: any) => ({
			...prevValues,
			...values,
		}));
	};

	const getFormValues = (): Partial<FormContextType> => {
		return form as Partial<FormContextType>;
	};

	return (
		<FormContext.Provider value={{ getFormValues, setFormValues }}>
			{children}
		</FormContext.Provider>
	);
};

export const useFormData = () => useContext(FormContext);
export default FormProvider;
