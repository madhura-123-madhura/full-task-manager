"use client"

import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/apis/employee.api'
import { GET_EMPLOYEE_RESPONSE, UPDATE_EMPLOYEE_REQUEST } from '@/types/Admin'
import { UPDATE_PROFILE_REQUEST } from '@/types/Employee'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const EmployeeProfile = () => {
    const [edit, setEdit] = useState()
    const { data } = useGetProfileQuery()
    const [updateProfile] = useUpdateProfileMutation()

    const updateSchma = z.object({
        _id: z.string(),
        email: z.string().min(1),
        name: z.string().min(1),
        mobile: z.string().min(1)
    }) satisfies z.ZodType<UPDATE_PROFILE_REQUEST>

    const { register, reset, handleSubmit, formState: { errors, touchedFields } } = useForm<UPDATE_PROFILE_REQUEST>({
        resolver: zodResolver(updateSchma),
        defaultValues: {
            _id: "",
            email: "",
            name: "",
            mobile: ""
        },

    })

    const handleEdit = async (data: UPDATE_EMPLOYEE_REQUEST) => {
        try {
            await updateProfile(data).unwrap()
            toast.success("update success")
            reset()
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
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span>PROFILE</span>
                            <button onClick={e => reset(data.result)} data-bs-toggle="modal" data-bs-target="#edit" className='btn btn-sm btn-warning '>Edit</button>
                        </div>
                        <div className="card-body">

                            <h6>Name:    {data.result.name}</h6>
                            <h6>Email:   {data.result.email}</h6>
                            <h6>Mobile:  {data.result.mobile}</h6>
                            <h6>Profile:  {data.result.profilePic}</h6>
                            <h6>Active:  {data.result.active ? "Active" : "InActive"}</h6>

                            <hr />

                        </div>
                    </div>
                </div>
                <div className="modal fade" id='edit'>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">Edit Profile</div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(handleEdit)}>
                                    <div>
                                        <input {...register("name")} type="text" placeholder='enter new name' className='form-control my-2' />
                                        <div className="invalid-feedback"></div>
                                    </div>
                                    <div>
                                        <input {...register("email")} type="text" placeholder='enter new email' className='form-control my-2' />
                                        <div className="invalid-feedback"></div>
                                    </div>
                                    <div>
                                        <input {...register("mobile")} type="text" placeholder='enter new mobile' className='form-control my-2' />
                                        <div className="invalid-feedback"></div>
                                    </div>
                                    <div className='text-end mt-3'>
                                        <button data-bs-dismiss="modal" className='btn btn-outline-warning'> Update</button>
                                        <button data-bs-dismiss="modal" className='ms-2 btn btn-outline-primary'>cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >}


    </>
}

export default EmployeeProfile