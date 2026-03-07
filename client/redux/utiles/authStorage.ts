import { SIGNIN_RESPONSE } from "@/types/Auth"


export const setStorage = (data: SIGNIN_RESPONSE, role: string) => {
    if (typeof window === "undefined") {
        return
    }
    if (role === "admin") {
        localStorage.setItem("ADMIN", JSON.stringify(data.result))
    } else {
        localStorage.setItem("EMPLOYEE", JSON.stringify(data.result))
    }
}
export const getStorage = (role: string) => {
    if (typeof window === "undefined") {
        return
    }
    const data = role === "admin"
        ? JSON.parse(localStorage.getItem("ADMIN") as string)
        : JSON.parse(localStorage.getItem("EMPLOYEE") as string)
    return data
}
export const removeStorage = (role: string) => {
    if (typeof window === "undefined") {
        return
    }
    const data = role === "admin"
        ? localStorage.removeItem("ADMIN")
        : localStorage.removeItem("EMPLOYEE")
    return data

}