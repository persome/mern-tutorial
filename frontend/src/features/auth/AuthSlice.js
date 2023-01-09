import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './AuthService'

//get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    // user: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// export const logout = createAsyncThunk('auth/logout',
//     async () => {
//         await authService.logout()
//     })

export const logout = createAsyncThunk('auth/logout',
    async () => {
        try {
            await authService.logout()
        } catch (error) {
            return error;
        }
    }
)


export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extrareducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rehected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})



export const { reset } = AuthSlice.actions
export default AuthSlice.reducer