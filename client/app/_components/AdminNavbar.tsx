import Link from 'next/link'
import React from 'react'

const AdminNavbar = () => {
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
            </div>
        </nav>
    </>
}

export default AdminNavbar