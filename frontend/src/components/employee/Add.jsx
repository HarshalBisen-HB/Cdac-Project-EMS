import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // EmailJS configuration
  const serviceId = "service_pfnoq7k";
  const templateId = "template_st9zy97";
  const publicKey = "haMGBLmPRUG4SBp9d";

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const sendEmailNotification = async (employeeData) => {
    const templateParams = {
      from_name: "Managers Portal",
      from_email: "harshal.ravindra.bisen@gmail.com",
      to_name: employeeData.name,
      to_email: employeeData.email,
      message: `Welcome to our company! Here are your login credentials:\n
      Email: ${employeeData.email}\n
      Password: ${employeeData.password}\n
      Please change your password upon first login.`,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.data.success) {
        await sendEmailNotification({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-white">Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input        
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Insert Name"
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Insert Email"
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Employee ID
              </label>
              <input
                type="text"
                name="employeeId"
                onChange={handleChange}
                placeholder="Employee ID"
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Gender
              </label>
              <select
                name="gender"
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                required
              >
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                onChange={handleChange}
                placeholder="Designation"
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Department
              </label>
              <select
                name="department"
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                onChange={handleChange}
                placeholder="Salary"
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="******"
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Role
              </label>
              <select
                name="role"
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;