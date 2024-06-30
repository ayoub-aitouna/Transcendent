"use client";

import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";

type ModalContextType = {
	OpenModal: (children: React.ReactNode) => void;
	CancelModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentModal, setCurrentModal] = useState<React.ReactNode>(null);

	const OpenModal = useCallback((children: React.ReactNode) => {
		setCurrentModal(children);
	}, []);

	const CancelModal = useCallback(() => {
		setCurrentModal(null);
	}, []);

	return (
		<ModalContext.Provider value={{ OpenModal, CancelModal }}>
			<ModalContainer>{currentModal}</ModalContainer>
			{children}
		</ModalContext.Provider>
	);
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => {
	if (!children) return null;
	return (
		<div className='fixed z-[999] inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
			{children}
		</div>
	);
};
