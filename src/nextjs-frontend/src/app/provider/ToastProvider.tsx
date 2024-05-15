"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import ToastContainer from "@/app/ui/dashboard/Toast/toast-container";
import { Toast } from "@/type/dashboard/index";

type ToastContextType = {
	toasts: Toast[];
	addToast: (toast: Toast) => void;
	removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const [toastQueue, setToastQueue] = useState<Toast[]>([]);

	const addToast = useCallback((toast: Toast) => {
		toast.id = window.crypto.getRandomValues(new Uint32Array(1))[0];
		setToasts((prev) => {
			if (prev.length < 3) {
				return [...prev, toast];
			} else {
				setToastQueue((prevQueue) => {
					return [...prevQueue, toast];
				});
				return prev;
			}
		});
	}, []);

	const removeToast = useCallback(
		(id: number) => {
			setToasts((prev) => prev.filter((toast) => toast.id !== id));
		},
		[toastQueue]
	);

	return (
		<ToastContext.Provider value={{ toasts, addToast, removeToast }}>
			<ToastContainer />
			{children}
		</ToastContext.Provider>
	);
};
