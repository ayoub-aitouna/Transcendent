"use client";
import ToggleOption from "@/app/ui/dashboard/component/toggle-option";
import React from "react";

const NotificationToggler = () => {
	const [checked, setChecked] = React.useState(false);
	React.useEffect(() => {
		if (typeof window !== "undefined" && "Notification" in window) {
			setChecked(Notification.permission === "granted");
		}
	}, []);

	const onCheck = React.useCallback(() => {
		if (typeof window !== "undefined" && "Notification" in window) {
			Notification.requestPermission();
		}
	}, []);

	return (
		<ToggleOption
			onCheck={() => onCheck()}
			checked={checked}
			title='Desktop Notification'
			desc='Receive desktop notifications for critical events.'
		/>
	);
};

export default NotificationToggler;
