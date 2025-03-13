import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSavedThemeFromLS } from "../../utils";

interface State {
    sort: string | null;
    theme: string;
}

const initialState: State = {
    sort: null,
    theme: getSavedThemeFromLS(),
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        sort: (state, action: PayloadAction<string | null>) => {
            if (state.sort === action.payload) {
                state.sort = null;
            } else {
                state.sort = action.payload;
            }
        },
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        }
    },
});

export const {
    sort,
    setTheme
} = userSlice.actions;
export {userSlice};