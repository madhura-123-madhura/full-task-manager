"use client"

import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/apis/employee.api'
import { GET_EMPLOYEE_RESPONSE, UPDATE_EMPLOYEE_REQUEST } from '@/types/Admin'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const EmployeeProfile = () => {
    const [edit, setEdit] = useState("")
    const { data } = useGetProfileQuery()
    const [updateProfile] = useUpdateProfileMutation()

    const handleEdit = async (data: UPDATE_EMPLOYEE_REQUEST) => {
        try {
            await updateProfile(data).unwrap()
            toast.success("update success")
        } catch (error) {
            console.log(error);
            toast.error("unabel to update")

        }
    }
    return <>
        {data && <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-header">PROFILE  </div>
                        <div className="card-body">

                            <h6>Name:    {data.result.name}</h6>
                            <h6>Email:   {data.result.email}</h6>
                            <h6>Mobile:  {data.result.mobile}</h6>
                            <h6>Profile:  {data.result.profilePic}</h6>
                            <h6>Active:  {data.result.active ? "Active" : "InActive"}</h6>
                            <button data-bs-toggle="modal" data-bs-target="#edit" className='btn btn-sm btn-warning '>Edit</button>
                            <hr />

                        </div>
                    </div>
                </div>
                <div className="modal fade" id='edit'>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">Edit Profile</div>
                            <div className="modal-body">
                                <input type="text" placeholder='enter new name' className='form-control my-2' />
                                <input type="text" placeholder='enter new email' className='form-control my-2' />
                                <input type="text" placeholder='enter new mobile' className='form-control my-2' />
                                <div className='text-end mt-3'>
                                    <button data-bs-dismiss="modal" className='btn btn-outline-success'> Done</button>
                                    <button data-bs-dismiss="modal" className='ms-2 btn btn-outline-primary'>cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >}


    </>
}

export default EmployeeProfile