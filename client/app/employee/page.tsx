"use client"

import { useGetProfileQuery, useGetTodosQuery, useLazyGetTodosQuery, useUpdateTodoMutation } from '@/redux/apis/employee.api'
import { GET_TODO_REQUEST, TOGGLE_TODO_REQUEST } from '@/types/Employee'
import clsx from 'clsx'
import { format, isBefore } from 'date-fns'
import React from 'react'
import { toast } from 'react-toastify'

const Employee = () => {

    const { data } = useGetTodosQuery()
    const [updateTodo] = useUpdateTodoMutation()


    const handleUpdateTodo = async (data: TOGGLE_TODO_REQUEST) => {
        try {
            await updateTodo(data).unwrap()
            toast.success("update Employee Success")
        } catch (error) {
            console.log(error);
            toast.error("unabel to update Todo")

        }
    }

    const handleLate = (islate: boolean) => clsx({
        "table-danger": islate
    })

    return <>
        {
            data && <table className='table table-bordered table-hover ' >
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>task</th>
                        <th>desc</th>
                        <th>priority</th>
                        <th>employee</th>
                        <th>due</th>
                        <th>complete</th>
                        <th>completeDate</th>
                        <th>is late</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.result.map(item => <tr key={item._id} className={`${isBefore(item.completeDate || new Date(), item.due) ? "table-success" : "table-danger"}`}>
                            <td>{item._id}</td>
                            <td>{item.task}</td>
                            <td>{item.desc}</td>
                            <td>{item.priority}</td>
                            <td>{item.employee.name}</td>
                            <td>{format(item.due, "dd-MMMM-yyyy hh:mm:ss a")}</td>
                            <td>
                                {
                                    item.complete
                                        ? "completed"
                                        : <button onClick={() => handleUpdateTodo({ _id: item._id, complete: true })} className='btn btn-success btn-sm'>incomplete</button>
                                }
                            </td>
                            <td>{item.completeDate && format(item.completeDate, "dd-MMMM-yyyy")}</td>
                            <td>
                                {
                                    isBefore(item.completeDate || new Date(), item.due)
                                        ? "No"
                                        : "Yes"
                                }
                            </td>
                        </tr>)
                    }
                </tbody>

            </table>
        }
    </>
}

export default Employee