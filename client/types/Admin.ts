export type TODO = {
    task: string
    desc: string
    priority: string
    employee: { _id: string, name: string, email: string, mobile: string }
    due: Date
    _id: string
    completeDate: Date
    complete: boolean
}
export type COMMON_RESPONSE = {
    message: string
}
export type GET_EMPLOYEE_RESPONSE = {
    message: string,
    result: {
        _id: string,
        name: string,
        email: string,
        mobile: string,
        role: string,
        active: boolean,
        isDelete: boolean
    }[]
}

export type UPDATE_EMPLOYEE_REQUEST = {
    _id: string,
    name: string,
    email: string,
    mobile: string,
}
export type UPDATE_EMPLOYEE_RESPONSE = {
    message: string
}

export type TOGGLE_EMPLOYEE_REQUEST = {
    _id: string
    status: boolean
}
export type TOGGLE_EMPLOYEE_RESPONSE = {
    message: string
}

export type DELETE_EMPLOYEE_REQUEST = {
    _id: string
    // isDelete: boolean
}
export type DELETE_EMPLOYEE_RESPONSE = {
    message: string
}

export type RESTORE_EMPLOYEE_REQUEST = {
    _id: string
    isDelete: boolean
}
export type RESTORE_EMPLOYEE_RESPONSE = {
    message: string
}

export type REMOVE_EMPLOYEE_REQUEST = {
    _id: string
}
export type REMOVE_EMPLOYEE_RESPONSE = {
    message: string
}

export interface TODO_CREATE_REQUEST {
    task: string
    desc: string
    priority: string
    employee: string
    due: string
}
export type TODO_CREATE_RESPONSE = {
    message: string
}


export type TODO_READ_RESPONSE = {
    message: string,
    result: TODO[]
}

export interface TODO_UPDATE_REQUEST extends TODO_CREATE_REQUEST {
    _id: string,
}
export type TODO_UPDATE_RESPONSE = {
    message: string,
}

export type TODO_DELETE_REQUEST = {
    _id: string,
}
export type TODO_DELETE_RESPONSE = {
    message: string,
}