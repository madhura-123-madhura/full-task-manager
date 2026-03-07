"use client"

import { useSignoutMutation } from '@/redux/apis/auth.api'
import { useAppSelector } from '@/redux/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const EmployeeNavbar = () => {
    const { employee } = useAppSelector(state => state.auth)
    const [logout] = useSignoutMutation()
    const router = useRouter()
    const handleLogout = async () => {
        try {
            await logout().unwrap()
            toast.success(" logout success")
            router.refresh()
        } catch (error) {
            console.log(error);
            toast.error("unabel to logout")


        }
    }
    return <>
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container">
                <a className="navbar-brand" href="#">Employee panel</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" href="/employee">Dashbord</Link>
                        <Link className="nav-link" href="/employee/profile">Profile</Link>
                    </div>
                </div>
                {
                    employee && <div className="dropdown" >
                        <button className='btn btn-light' data-bs-toggle="dropdown">welcom {employee.name}</button>
                        <div className="dropdown-menu">
                            <li className='dropdown-item'> <Link href="/employee/profile" className='nav-link'>profile</Link></li>
                            <li className='dropdown-item'> <Link href="/employee" className='nav-link'>dashbord</Link></li>
                            <li className='dropdown-item'><button onClick={handleLogout} className='btn btn-link text-danger'>logout</button></li>

                        </div>
                    </div>
                }
            </div>
        </nav>
    </>
}

export default EmployeeNavbar