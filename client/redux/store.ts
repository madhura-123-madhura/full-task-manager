import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/auth.api";
import { adminApi } from "./apis/admin.api";
import { employeeApi } from "./apis/employee.api";

import authSlice from "./slices/auth.slice"
import { useSelector } from "react-redux";
const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        auth: authSlice
    },
    middleware: def => def().concat(authApi.middleware, adminApi.middleware, employeeApi.middleware)
})

type RootType = ReturnType<typeof reduxStore.getState>
export const useAppSelector = useSelector.withTypes<RootType>()
export default reduxStore