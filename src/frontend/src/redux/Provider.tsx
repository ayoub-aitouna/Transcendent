"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function StoreProvider({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	return <Provider store={store}>{children}</Provider>;
}
