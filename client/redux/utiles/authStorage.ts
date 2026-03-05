import { SIGNIN_RESPONSE } from "@/types/Auth"


export const setStorage = (data: SIGNIN_RESPONSE) => {
    localStorage.setItem("ADMIN", JSON.stringify(data.result))
}
export const getStorage = () => {
    return JSON.parse(localStorage.getItem("ADMIN") as string)
}
export const removeStorage = () => {
    localStorage.removeItem("ADMIN")
}