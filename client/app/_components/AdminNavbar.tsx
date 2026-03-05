"use client"

import { useAppSelector } from '@/redux/store'
import Link from 'next/link'
import React from 'react'

const AdminNavbar = () => {
    const { admin } = useAppSelector(state => state.auth)
    return <>
        <nav className="navbar navbar-expand-lg bg-danger">
            <div className="container">
                <a className="navbar-brand" href="#">Admin panel</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" href="/admin">Dasbord</Link>
                        <Link className="nav-link" href="/admin/employee">Employee</Link>
                        <Link className="nav-link" href="/admin/todo">Todo</Link>
                    </div>
                </div>
                {
                    admin && <div className="dropdown" data-bs-toggle="dropdown">
                        <button className='btn btn-light'>welcom {admin.name}</button>
                        <div className="dropdown-menu">
                            <li className='dropdown-item'> <Link href="/admin/profile" className='nav-link'>profile</Link></li>
                            <li className='dropdown-item'> <Link href="/admin/setting" className='nav-link'>setting</Link></li>
                            <li className='dropdown-item'><button className='btn btn-link text-danger'>logout</button></li>

                        </div>
                    </div>
                }
            </div>
        </nav>
    </>
}

export default AdminNavbar