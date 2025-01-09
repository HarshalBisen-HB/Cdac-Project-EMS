import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'

const List = () => {
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const [filteredEmployee, setFilteredEmployees] = useState(null)

    // Custom theme for DataTable
    const customStyles = {
        header: {
            style: {
                backgroundColor: '#1a1a2e',
                color: '#fff'
            },
        },
        headRow: {
            style: {
                backgroundColor: '#1a1a2e',
                color: '#fff',
                borderBottom: '2px solid #374151'
            },
        },
        headCells: {
            style: {
                color: '#fff',
                fontSize: '0.95rem'
            },
        },
        cells: {
            style: {
                backgroundColor: '#111827',
                color: '#d1d5db',
                '&:hover': {
                    backgroundColor: '#1f2937'
                }
            },
        },
        rows: {
            style: {
                backgroundColor: '#111827',
                '&:hover': {
                    backgroundColor: '#1f2937',
                    cursor: 'pointer'
                }
            },
        },
        pagination: {
            style: {
                backgroundColor: '#1a1a2e',
                color: '#fff'
            },
            pageButtonsStyle: {
                backgroundColor: '#374151',
                color: '#fff'
            }
        }
    }

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true)
            try {
                const responnse = await axios.get(
                    "http://localhost:5000/api/employee",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (responnse.data.success) {
                    let sno = 1;
                    const data = await responnse.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department.dep_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: <img width={40} className='rounded-full border-2 border-purple-500 shadow-lg' src={`http://localhost:5000/${emp.userId.profileImage}`} />,
                        action: (<EmployeeButtons Id={emp._id} />),
                    }));
                    setEmployees(data);
                    setFilteredEmployees(data)
                }
            } catch (error) {
                console.log(error.message)
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setEmpLoading(false)
            }
        };

        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const records = employees.filter((emp) => (
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFilteredEmployees(records)
    }

    if (!filteredEmployee) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500"></div>
            </div>
        )
    }

    return (
        <div className='p-6 bg-gray-900 min-h-screen text-gray-100'>
            <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-purple-400">Manage Employee</h3>
            </div>
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Search by Employee Name"
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-gray-100 placeholder-gray-400 w-64"
                    onChange={handleFilter}
                />
                <Link
                    to="/admin-dashboard/add-employee"
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-medium transition-colors duration-200 shadow-lg hover:shadow-purple-500/20"
                >
                    Add New Employee
                </Link>
            </div>
            <div className='mt-6 rounded-lg overflow-hidden shadow-xl'>
                <DataTable 
                    columns={columns} 
                    data={filteredEmployee} 
                    pagination 
                    customStyles={customStyles}
                    theme="dark"
                    highlightOnHover
                    pointerOnHover
                />
            </div>
        </div>
    )
}

export default List