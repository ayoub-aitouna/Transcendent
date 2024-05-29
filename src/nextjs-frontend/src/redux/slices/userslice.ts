import { Friend, FriendRequest, FriendRequestState, Rank, user } from '@/type/auth/user'
import { createSlice } from '@reduxjs/toolkit'

type userState = {
    user: user,
    token: string,
    isAuth: boolean,
}

const initialState: userState = {
    user: {
        id: 0,
        fullname: '',
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        image_url: '',
		is_my_profile: false,
        registration_method: '',
        coins: 0,
        status: 'offline',
        rank: {} as Rank,
		friend_request_state: FriendRequestState.NONE,
        current_xp: 0,
        friends: [] as Friend[],
        friend_requests: [] as FriendRequest[],
        achievements: [] as any[],
        ranking_logs: [] as any[],
        send_request: '',
        is_friend: false,
        is_blocked: false,
        enabled_2fa: false,
        rankProgressPercentage: 0,
		level: 0

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
            },
            UpdateUser: (state, action) => {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        ...action.payload
                    }
                }
            }
        }
    }
)

export const { Logout, Login, UpdateUser } = userSlice.actions;
export default userSlice.reducer;