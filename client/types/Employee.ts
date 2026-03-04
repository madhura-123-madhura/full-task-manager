import { TODO } from "./Admin"



export type GET_TODO_REQUEST = {
    _id: string,
}

export type GET_TODO_RESPONSE = {
    message: string,
    result: TODO[]
}
export type TOGGLE_TODO_REQUEST = {
    _id: string,
    complete: boolean,
}



export type GET_PROFILE_RESPONSE = {
    message: string,
    result: {
        name: string,
        email: string,
        mobile: string,
        role: string,
        active: boolean,
        profilePic: string,
    },
}
export type UPDATE_PROFILE_REQUEST = {
    _id: string
    name: string,
    email: string,
    mobile: string,
}