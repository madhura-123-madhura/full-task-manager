"use client"

import { useLazyGetTodosQuery } from '@/redux/apis/employee.api'
import { GET_TODO_REQUEST } from '@/types/Employee'
import React from 'react'
import { toast } from 'react-toastify'

const Employee = () => {
    const [getTodo, { data }] = useLazyGetTodosQuery()
    const handleGetTodo = async (data: GET_TODO_REQUEST) => {
        try {
            await getTodo(data).unwrap()
            toast.success("get Employee Success")
        } catch (error) {
            console.log(error);
            toast.error("unabel to get Todo")

        }
    }

    return <>
        {
            data && <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>task</th>
                        <th>desc</th>
                        <th>priority</th>
                        <th>complete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.result.map(item => <tr>
                            <td>{item._id}</td>
                            <td>{item.task}</td>
                            <td>{item.desc}</td>
                            <td>{item.priority}</td>
                            <td>
                                {
                                    item.complete
                                        ? <button>complete</button>
                                        : <button>incomplete</button>
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