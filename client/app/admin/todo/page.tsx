"use client"

import { useGetEmployeesQuery, useTodoCreateMutation, useTodoReadQuery, useTodoUpdateMutation } from '@/redux/apis/admin.api'
import { TODO_CREATE_REQUEST } from '@/types/Admin'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { format, isAfter } from 'date-fns'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z, { date } from 'zod'

const AdminTodo = () => {
    const [selectedTodo, setselectedTodo] = useState<string | null>()
    const { data: empData } = useGetEmployeesQuery()
    const { data } = useTodoReadQuery()
    const [createTodo] = useTodoCreateMutation()
    const [updateTodo] = useTodoUpdateMutation()
    const taskSchema = z.object({
        task: z.string().min(1),
        desc: z.string().min(1),
        priority: z.string().min(1),
        employee: z.string().min(1),
        due: z.string(),

    }) satisfies z.ZodType<TODO_CREATE_REQUEST>

    const { register, reset, handleSubmit, formState: { errors, dirtyFields } } = useForm<TODO_CREATE_REQUEST>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            task: "",
            desc: "",
            priority: "",
            employee: "",
            due: "",


        },

    })
    const handleTask = async (data: TODO_CREATE_REQUEST) => {
        try {
            if (selectedTodo) {
                await updateTodo({ ...data, _id: selectedTodo }).unwrap()
                toast.success("todo update success")
                reset({ task: "", desc: "", priority: "", due: "", employee: "" })
                setselectedTodo(null)
            } else {
                await createTodo(data).unwrap()
                toast.success("task created succefully")
                reset()
            }


        } catch (error) {
            console.log(error);
            toast.error(" unabel to to create task")
        }
    }

    const handleClassess = (key: keyof TODO_CREATE_REQUEST) => clsx({
        "form-control my-2": true,
        "is-invalid": errors && errors[key],
        "is-valid": dirtyFields[key] && !errors[key],
    })

    const handleEdit = (data: any) => {
        reset({
            task: data.task,
            desc: data.desc,
            priority: data.priority,
            employee: data.employee._id,
            due: format(data.due, "yyy-MM-dd")
        })
    }
    return <>
        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-headeras">Task For employee</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleTask)}>
                                <div>
                                    <input {...register("task")} type="text" placeholder='Enter task' className={handleClassess("task")} />
                                    <div className='invalid-feedback'>{errors && errors.task?.message}</div>
                                </div>
                                <div>
                                    <input {...register("desc")} type="text" placeholder='Enter desc' className={handleClassess("desc")} />
                                    <div className='invalid-feedback'>{errors && errors.desc?.message}</div>
                                </div>
                                <div>
                                    <input {...register("due")} type="date" placeholder='Enter desc' className={handleClassess("due")} />
                                    <div className='invalid-feedback'>{errors && errors.desc?.message}</div>
                                </div>
                                <div>
                                    <select className={handleClassess("employee")} {...register("employee")}>
                                        <option value="">choose employee</option>
                                        {
                                            empData && empData.result.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
                                        }
                                    </select>
                                    <div className='invalid-feedback'>{errors && errors.employee?.message}</div>
                                </div>
                                <div>
                                    <select {...register("priority")} className={handleClassess("priority")}>
                                        <option value="">choose option</option>
                                        <option value="high">high</option>
                                        <option value="medium">medium</option>
                                        <option value="low">low</option>
                                    </select>
                                    <div className='invalid-feedback'>{errors && errors.priority?.message}</div>
                                </div>
                                {
                                    selectedTodo
                                        ? <button type='submit' className='btn btn-warning w-100'>update</button>
                                        : <button type='submit' className='btn btn-primary w-100'>Add</button>
                                }

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
            data && <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>task</th>
                        <th>desc</th>
                        <th>priority</th>
                        <th>employee</th>
                        <th>complete</th>
                        <th>due</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.result.map(item => <tr key={item._id} className={`${isAfter(item.due, item.completeDate || new Date()) ? "table-success" : "table-danger"}`}>
                            <td>{item._id}</td>
                            <td>{item.task}</td>
                            <td>{item.desc}</td>
                            <td>{item.priority}</td>
                            <td>{item.employee.name}</td>
                            <td>{item.complete ? "Yes" : "No"}</td>
                            <td>{item.due.toLocaleString()}</td>
                            <td>
                                {
                                    item.complete
                                        ? <button type='button' className='btn btn-success btn-sm'>Complete</button>
                                        : <button type='button' className='btn btn-danger btn-sm'>In-Complete</button>
                                }
                                {
                                    !item.complete && <button onClick={() => {
                                        handleEdit(item)
                                        setselectedTodo(item._id)
                                    }} className='btn btn-sm btn-outline-warning ms-2'><i className='bi bi-pencil'></i> </button>
                                }

                            </td>
                        </tr>
                        )
                    }
                </tbody>
            </table >
        }
    </>
}

export default AdminTodo