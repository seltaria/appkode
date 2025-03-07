import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types/User";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users" }),
    endpoints: (builder) => ({
        getUserList: builder.query<User[], void>({
            query: () => "?__example=all",
            transformResponse: ( res: {items: User[]} ) => res.items,
        }),
        getDepartmentUserList: builder.query<User[], string>({
            query: (department) => `?__example=${department}`,
            transformResponse: ( res: {items: User[]} ) => res.items,
        }),
    })
})

export const { useGetUserListQuery, useGetDepartmentUserListQuery } = userApi;