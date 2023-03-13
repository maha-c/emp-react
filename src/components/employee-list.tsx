import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getAllEmployees, Employee, deleteEmployee } from '../api/employee-request';

const EmployeeList = () => {
  
  const { data, isLoading, isError } = useQuery<Employee[]>('employees',getAllEmployees);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching employees.</div>;
  }

  return (
    <div>
      <h2>Employee List</h2>
      <Link to="/employees/new">Add Employee</Link>
      <ul>
        {data?.map((employee) => (
          <li key={employee.id}>
            <Link to={`/employees/${employee.id}`}>
              {employee.firstName} {employee.lastName}
            </Link>
            <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
