import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

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
    }
  };

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const responnse = await axios.get(
        "http://localhost:5000/api/department",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (responnse.data.success) {
        let sno = 1;
        const data = await responnse.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />),
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {depLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-purple-400">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search By Department Name"
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-white placeholder-gray-400 w-64"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-medium transition-colors duration-200 shadow-lg hover:shadow-purple-500/20"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-6 rounded-lg overflow-hidden shadow-xl">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              customStyles={customStyles}
              theme="dark"
              highlightOnHover
              pointerOnHover
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;