import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

const initialState: {search: string, sort: string | null, currentUser: User | null} = {
    search: "",
    sort: null,
    currentUser: null,
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
        // TODO: check
        saveCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
        }
    },
});

export const {
    search,
    sort,
    saveCurrentUser,
} = userSlice.actions;
export {userSlice};