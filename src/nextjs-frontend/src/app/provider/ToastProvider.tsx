"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import ToastContainer from "@/app/ui/dashboard/Toast/toast-container";
import { randomInt } from "crypto";
type ToastItem = {
	id: number;
	title: string;
	message: string;
	icon: string;
	color: string;
};

type ToastContextType = {
	toasts: ToastItem[];
	addToast: (toast: ToastItem) => void;
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
	const [toasts, setToasts] = useState<ToastItem[]>([]);
	const [toastQueue, setToastQueue] = useState<ToastItem[]>([]);

	const addToast = useCallback((toast: ToastItem) => {
		toast.id = window.crypto.getRandomValues(new Uint32Array(1))[0];
		setToasts((prev) => {
			if (prev.length < 3) {
				return [...prev, toast];
			} else {
				console.log("queue");
				setToastQueue((prevQueue) => {
					console.log("queue", prevQueue);
					return [...prevQueue, toast];
				});
				return prev;
			}
		});
	}, []);

	const removeToast = useCallback(
		(id: number) => {
			console.log(id);
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
