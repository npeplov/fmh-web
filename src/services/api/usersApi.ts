import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";
import { IUserInfo } from "src/services/api/authApi";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUsers: builder.query<IUserInfo[], void>({
      query: () => "users",
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
