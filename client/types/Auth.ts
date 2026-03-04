export type SIGNIN_REQUEST = {
    email: string,
    password: string,
}
export type SIGNIN_RESPONSE = {
    message: string,
    result: {
        name: string,
        email: string,
        mobile: string,
        profilePic: string,
        _id: string,
        role: string,
    }
}
export type REGISTER_EMPLOYEE_REQUEST = {
    name: string,
    email: string,
    mobile: string,
}
export type REGISTER_EMPLOYEE_RESPONSE = {
    message: string
}


export type SEND_OTP_REQUEST = {
    username: string,
}
export type SEND_OTP_RESPONSE = {
    message: string
}

export type VERIFY_OTP_REQUEST = {
    username: string,
    otp: string,
}
export type VERIFY_OTP_RESPONSE = {
    message: string
}


export type FORGET_PASSWORD_REQUEST = {
    username: string,
}
export type FORGET_PASSWORD_RESPONSE = {
    message: string
}

export type CHANGE_PASSWORD_REQUEST = {
    password: string,
    token: string,
}
export type CHANGE_PASSWORD_RESPONSE = {
    message: string
}