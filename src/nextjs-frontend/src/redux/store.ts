import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import {TypedUseSelectorHook} from 'react-redux'
import {useDispatch, useSelector} from 'react-redux'

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

