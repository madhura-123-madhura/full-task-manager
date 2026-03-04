import React from 'react'
import AdminNavbar from '../_components/AdminNavbar'

const layout = ({ children }: { children: React.ReactNode }) => {
    return <>
        <AdminNavbar />
        {children}
    </>
}

export default layout