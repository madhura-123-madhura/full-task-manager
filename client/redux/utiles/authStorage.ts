import { SIGNIN_RESPONSE } from "@/types/Auth"


export const setStorage = (data: SIGNIN_RESPONSE) => {
    if (typeof window === undefined) {
        return
    }
    localStorage.setItem("ADMIN", JSON.stringify(data.result))
}
export const getStorage = () => {
    if (typeof window === undefined) {
        return
    }
    return JSON.parse(localStorage.getItem("ADMIN") as string)
}
export const removeStorage = () => {
    if (typeof window === undefined) {
        return
    }
    localStorage.removeItem("ADMIN")
}