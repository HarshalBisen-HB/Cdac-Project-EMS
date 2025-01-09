import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      {departments ? (
        <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
          <h2 className="text-3xl font-bold mb-8 text-white text-center">
            Add Salary Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleDepartment}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white 
                           focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employee */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Employee
                </label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white 
                           focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Basic Salary */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  onChange={handleChange}
                  placeholder="Enter basic salary"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white 
                           focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200
                           placeholder-gray-500"
                  required
                />
              </div>

              {/* Allowances */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  onChange={handleChange}
                  placeholder="Enter allowances"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white 
                           focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200
                           placeholder-gray-500"
                  required
                />
              </div>

              {/* Deductions */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  onChange={handleChange}
                  placeholder="Enter deductions"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white 
                           focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200
                           placeholder-gray-500"
                  required
                />
              </div>

              {/* Pay Date */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white 
                           focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg
                       transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-purple-500/20"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl font-medium">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default Add;
