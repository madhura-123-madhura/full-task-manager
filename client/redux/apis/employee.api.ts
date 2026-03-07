// import { APP_URL } from "@/constants/config"
import { APP_URL } from "@/constant/config"
import { COMMON_RESPONSE } from "@/types/Admin"
import { GET_PROFILE_RESPONSE, GET_TODO_REQUEST, GET_TODO_RESPONSE, TOGGLE_TODO_REQUEST, UPDATE_PROFILE_REQUEST } from "@/types/Employee"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const employeeApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/emp`,
        credentials: "include"
    }),
    tagTypes: ["todo", "profile"],
    endpoints: (builder) => {
        return {
            getTodos: builder.query<GET_TODO_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/todos",
                        method: "GET"
                    }
                },
                providesTags: ["todo"]
            }),
            updateTodo: builder.mutation<COMMON_RESPONSE, TOGGLE_TODO_REQUEST>({
                query: todoData => {
                    return {
                        url: "/todo-update/" + todoData._id,
                        method: "PUT",
                        body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),

            getProfile: builder.query<GET_PROFILE_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/profile",
                        method: "GET"
                    }
                },
                providesTags: ["profile"]
            }),
            updateProfile: builder.mutation<COMMON_RESPONSE, UPDATE_PROFILE_REQUEST>({
                query: profileData => {
                    return {
                        url: "/profile-update",
                        method: "PUT",
                        body: profileData
                    }
                },
                invalidatesTags: ["profile"]
            }),

        }
    }
})

export const {
    useGetTodosQuery,
    useUpdateTodoMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useLazyGetTodosQuery,
} = employeeApi
