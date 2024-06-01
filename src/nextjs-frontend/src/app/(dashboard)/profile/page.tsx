import { redirect } from "next/navigation";

const page = () => {
	redirect(`/profile/me`);
};

export default page;
