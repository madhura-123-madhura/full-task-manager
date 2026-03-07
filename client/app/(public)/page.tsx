"use client"

import { useSendOtpMutation, useSigninMutation, useVerifyOtpMutation } from '@/redux/apis/auth.api'
import { SEND_OTP_REQUEST, SIGNIN_REQUEST, VERIFY_OTP_REQUEST } from '@/types/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Login = () => {
    const [showLoginWithOtp, setShowLoginWithOtp] = useState(false)
    const [signin, { isLoading }] = useSigninMutation()
    const router = useRouter()

    const loginSchema = z.object({
        email: z.string().min(1).email(),
        password: z.string().min(1)
    }) satisfies z.ZodType<SIGNIN_REQUEST>
    const { register, reset, handleSubmit, formState: { errors, touchedFields } } = useForm<SIGNIN_REQUEST>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },

    })
    const handleLogin = async (data: SIGNIN_REQUEST) => {
        try {
            const { result } = await signin(data).unwrap()
            toast.success("Login success")
            reset()
            if (result.role == "admin") {
                router.push("/admin")
                router.refresh()
            } else {
                router.push("/employee")
                router.refresh()
            }
        } catch (error) {
            console.log(error);
            toast.error(" unabel to Login")
        }
    }
    const handleClassess = (key: keyof SIGNIN_REQUEST) => clsx({
        "form-control my-2": true,
        "is-invalid": errors[key],
        "is-valid": touchedFields[key] && !errors[key],
    })
    return <>
        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            {
                                showLoginWithOtp
                                    ? <LoginWithOTP />
                                    : <form onSubmit={handleSubmit(handleLogin)}>
                                        <div>
                                            <input {...register("email")} className={handleClassess('email')} type="email" placeholder='email@example.com' />
                                            <div className="invalid-feedback">{errors && errors.email?.message}</div>
                                        </div>
                                        <div>
                                            <input {...register("password")} className={handleClassess("password")} type="password" placeholder='Enter password' />
                                            <div className="invalid-feedback">{errors && errors.password?.message}</div>
                                        </div>
                                        <button disabled={isLoading} className='btn btn-primary mt-2 w-100'>
                                            {
                                                isLoading
                                                    ? <span className='spinner spinner-border'></span>
                                                    : "login"

                                            }
                                        </button>
                                    </form>
                            }

                            <hr />
                            <div className='d-flex justify-content-between'>
                                {
                                    showLoginWithOtp
                                        ? <button onClick={e => setShowLoginWithOtp(false)} className='btn btn-link'>Login with email/password</button>
                                        : <button onClick={e => setShowLoginWithOtp(true)} className='btn btn-link'>Login with otp</button>
                                }

                                <button className='btn btn-link'>forget password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
const LoginWithOTP = () => {
    const router = useRouter()
    const [showOtp, setShowOtp] = useState(false)
    const [SendOtp, { isSuccess }] = useSendOtpMutation()
    const [verifyOtp] = useVerifyOtpMutation()
    const loginSchema = z.object({
        username: z.string().min(1),
        otp: z.string()
    }) satisfies z.ZodType<SEND_OTP_REQUEST>
    const { register, reset, handleSubmit, formState: { errors, touchedFields } } = useForm<SEND_OTP_REQUEST>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            otp: ""
        },

    })
    const handleSendOtp = async (data: SEND_OTP_REQUEST) => {
        try {
            await SendOtp(data).unwrap()
            toast.success("send otp success")
            setShowOtp(true)
        } catch (error) {
            console.log(error);
            toast.error("unabel to send otp")

        }
    }
    const handleVerify = async (data: VERIFY_OTP_REQUEST) => {
        try {
            const { result } = await verifyOtp(data).unwrap()
            toast.success("verify otp success")
            if (result.role === "admin") {
                router.push("/admin")
                router.refresh()
            } else {
                router.push("/employee")
                router.refresh()
            }
        } catch (error) {
            console.log(error);
            toast.error("unabel to send otp")

        }
    }
    const handleOTP = (data: SEND_OTP_REQUEST) => {
        if (showOtp) {
            handleVerify(data)
        } else {
            handleSendOtp(data)
        }
    }
    return <>
        <form onSubmit={handleSubmit(handleOTP)}>
            {
                showOtp
                    ? <div>
                        <input {...register("otp")} type="text" className='form-control my-2' placeholder='Enter your OTP' />
                        <button type='submit' className='btn btn-primary w-100 '>verify otp</button>
                    </div>
                    : <div>
                        <input {...register("username")} type="text" className='form-control my-2' placeholder='Enter your email/password' />
                        <button type='submit' className='btn btn-primary w-100 '>Send otp</button>
                    </div>
            }


        </form>
    </>
}
export default Login