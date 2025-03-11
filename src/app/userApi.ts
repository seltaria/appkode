import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserListRequest } from "../types";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users" }),
    endpoints: (builder) => ({
        getUserList: builder.query<User[], UserListRequest>({
            query: ({ department, isDynamic, isError }) => {
                return `?__example=${department || "all"}&__dynamic=${!!isDynamic}${isError ? "&__code=500" : ""}`
            },
            transformResponse: ( res: {items: User[]} ) => res.items,
        }),
    })
})

export const { useGetUserListQuery } = userApi;