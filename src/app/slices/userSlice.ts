import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {search: string, sort: string | null} = {
    search: "",
    sort: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        search: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        sort: (state, action: PayloadAction<string | null>) => {
            state.sort = action.payload;
        },
    },
});

export const {
    search,
    sort,
} = userSlice.actions;
export {userSlice};