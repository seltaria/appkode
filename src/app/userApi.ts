import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types/User";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users" }),
    endpoints: (builder) => ({
        getUserList: builder.query<User[], string>({
            query: (department) => `?__example=${department || "all"}`,
            transformResponse: ( res: {items: User[]} ) => res.items,
        }),
    })
})

export const { useGetUserListQuery } = userApi;