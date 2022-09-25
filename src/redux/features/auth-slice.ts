import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
    apiKey: string,
    step: number,
}

const initialState: AuthState = {
    apiKey: '',
    step: 0,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setApiKey(state: AuthState, action: PayloadAction<string>) {
            state.apiKey = action.payload;
        },

        setStep(state: AuthState, action: PayloadAction<number>) {
            state.step = action.payload;
        },
    }
});

export const {
    setApiKey,setStep,
} = authSlice.actions;

export default authSlice.reducer;