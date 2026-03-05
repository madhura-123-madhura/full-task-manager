import Link from 'next/link'
import React from 'react'

const EmployeeNavbar = () => {
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
            </div>
        </nav>
    </>
}

export default EmployeeNavbar