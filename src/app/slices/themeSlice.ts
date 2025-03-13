import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSavedThemeFromLS } from "../../utils";

interface State {
    theme: string;
}

const initialState: State = {
    theme: getSavedThemeFromLS(),
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        }
    },
});

export const {
    setTheme
} = themeSlice.actions;
export {themeSlice};