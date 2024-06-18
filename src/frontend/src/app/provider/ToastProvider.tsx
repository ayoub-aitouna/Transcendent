"use client";

import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
	useRef,
} from "react";
import ToastContainer from "@/app/ui/dashboard/Toast/toast-container";
import { Toast } from "@/type/dashboard/index";
import { parseCookies } from "nookies";

type ToastContextType = {
	toasts: Toast[];
	addToast: (toast: Toast) => void;
	removeToast: (id: number) => void;
	useEmitMessage: (message: any) => void;
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
	const ws = useRef<WebSocket | null>(null);
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

	useEffect(() => {
		const nookies = parseCookies();
		if (!nookies.access || !nookies.refresh) return;
		if (!ws.current) {
			console.log("connecting to ws");
			ws.current = new WebSocket("ws://localhost:8000/ws/user/connect/");
			ws.current.onopen = () => {
				console.log("connected to ws");
			};
			ws.current.onclose = () => {
				console.log("disconnected from ws");
			};
			ws.current.onmessage = (event) => {
				const data = JSON.parse(event.data);
				addToast({
					id: data.id || 0,
					title: data.title,
					message: data.extra_content || "",
					icon: data.icon || "fa fa-info-circle",
					backgroundColor:
						data.type === "notification" ? "bg-blue-500" : "bg-primary",
				});
			};
		}
	}, []);

	const useEmitMessage = useCallback(
		(message: any) => {
			if (ws.current && ws.current.readyState === 1) {
				ws.current.send(JSON.stringify(message));
			} else {
				console.log("ws not connected");
			}
		},
		[ws]
	);

	return (
		<ToastContext.Provider
			value={{ toasts, addToast, removeToast, useEmitMessage }}>
			<ToastContainer />
			{children}
		</ToastContext.Provider>
	);
};
