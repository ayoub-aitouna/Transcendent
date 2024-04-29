import { user } from '@/type/auth/user'
import { createSlice } from '@reduxjs/toolkit'

type userState = {
    user: user,
    token: string,
    isAuth: boolean,
}

const initialState: userState = {
    user: {
        email: "",
        password: "",
        image_url: "",
        username: "",
        first_name: "",
        last_name: "",
    },
    token: "",
    isAuth: false,
}

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            Logout: (_) => {
                return (initialState);
            },
            Login: (_, action) => {
                return {
                    user: action.payload.user,
                    token: action.payload.token,
                    isAuth: true,
                    isLoading: false,
                    error: "",
                };
            }
        }
    }
)
export const { Logout, Login } = userSlice.actions;
export default userSlice.reducer;