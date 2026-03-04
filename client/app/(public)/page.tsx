"use client"

import { useSigninMutation } from '@/redux/apis/auth.api'
import { SIGNIN_REQUEST } from '@/types/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Login = () => {
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
                            <form onSubmit={handleSubmit(handleLogin)}>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Login