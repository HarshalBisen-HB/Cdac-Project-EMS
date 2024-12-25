import React from "react"
import { useAuth } from "../context/authContext"

const EmployeeDashboard = () => {
    const {user} = useAuth()
    return(
        <div>hello Emp</div>
    )
}

export default EmployeeDashboard

