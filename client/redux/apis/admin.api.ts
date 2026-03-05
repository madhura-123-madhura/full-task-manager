// import { APP_URL } from "@/constants/config"
import { APP_URL } from "@/constant/config"
import { COMMON_RESPONSE, DELETE_EMPLOYEE_REQUEST, GET_EMPLOYEE_RESPONSE, REMOVE_EMPLOYEE_REQUEST, RESTORE_EMPLOYEE_REQUEST, TODO_CREATE_REQUEST, TODO_CREATE_RESPONSE, TODO_DELETE_REQUEST, TODO_READ_RESPONSE, TODO_UPDATE_REQUEST, TOGGLE_EMPLOYEE_REQUEST, UPDATE_EMPLOYEE_REQUEST, UPDATE_EMPLOYEE_RESPONSE } from "@/types/Admin"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/admin`,
        credentials: "include"
    }),
    tagTypes: ["employee", "todo"],
    endpoints: (builder) => {
        return {
            getEmployees: builder.query<GET_EMPLOYEE_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/employee",
                        method: "GET"
                    }
                },
                providesTags: ["employee"]
            }),
            updateEmployee: builder.mutation<COMMON_RESPONSE, UPDATE_EMPLOYEE_REQUEST>({
                query: userData => {
                    return {
                        url: "/update-employee/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["employee"]
            }),
            toggleEmployeeStatus: builder.mutation<COMMON_RESPONSE, TOGGLE_EMPLOYEE_REQUEST>({
                query: userData => {
                    return {
                        url: "/toggle-employee-status/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["employee"]
            }),
            deleteEmployee: builder.mutation<COMMON_RESPONSE, DELETE_EMPLOYEE_REQUEST>({
                query: ({ _id }) => {
                    return {
                        url: "/delete-employee/" + _id,
                        method: "PUT",
                    }
                },
                invalidatesTags: ["employee"]
            }),
            restoreEmployee: builder.mutation<COMMON_RESPONSE, RESTORE_EMPLOYEE_REQUEST>({
                query: userData => {
                    return {
                        url: "/restore-employee/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["employee"]
            }),
            removeEmployee: builder.mutation<COMMON_RESPONSE, REMOVE_EMPLOYEE_REQUEST>({
                query: ({ _id }) => {
                    return {
                        url: "/remove-employee/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["employee"]
            }),


            todoCreate: builder.mutation<TODO_CREATE_RESPONSE, TODO_CREATE_REQUEST>({
                query: todoData => {
                    return {
                        url: "/todo-create",
                        method: "POST",
                        body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),
            todoRead: builder.query<TODO_READ_RESPONSE, void>({
                query: todoData => {
                    return {
                        url: "/todo",
                        method: "GET",
                    }
                },
                providesTags: ["todo"]
            }),
            todoUpdate: builder.mutation<COMMON_RESPONSE, TODO_UPDATE_REQUEST>({
                query: todoData => {
                    return {
                        url: "/todo/" + todoData._id,
                        method: "PUT",
                        body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),
            todoDelete: builder.mutation<COMMON_RESPONSE, TODO_DELETE_REQUEST>({
                query: todoData => {
                    return {
                        url: "/todo/" + todoData._id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["todo"]
            }),

        }
    }
})

export const {
    useGetEmployeesQuery,
    useUpdateEmployeeMutation,
    useToggleEmployeeStatusMutation,
    useDeleteEmployeeMutation,
    useRestoreEmployeeMutation,
    useRemoveEmployeeMutation,

    useTodoCreateMutation,
    useTodoReadQuery,
    useTodoUpdateMutation,
    useTodoDeleteMutation

} = adminApi
