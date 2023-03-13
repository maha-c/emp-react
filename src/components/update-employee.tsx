import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Employee, EmployeeForm, updateEmployee } from "../api/employee-request";



type UpdateEmployeeProps = {
  employee: Employee;
};

export function UpdateEmployee({ employee }: UpdateEmployeeProps) {
  const [form, setForm] = useState<EmployeeForm>({
    firstName: employee.firstName,
    lastName: employee.lastName,
    title: employee.title,
    email: employee.email,
  });

  const queryClient = useQueryClient();

  const updateEmployeeMutation = useMutation(updateEmployee, {onSuccess: () => queryClient.invalidateQueries("employeecache"),
  });

  useEffect(() => {
    setForm({
      firstName: employee.firstName,
      lastName: employee.lastName,
      title: employee.title,
      email: employee.email,
    });
  }, [employee]);

  function updateEmployees() {
    const updatedEmployee: Employee = {
      id: employee.id,
      firstName: form.firstName,
      lastName: form.lastName,
      title: form.title,
      email: form.email,
    };

    updateEmployeeMutation.mutate(updatedEmployee);
  }

  return (
    <>
      <h3>Update Employee{employee.firstName} {employee.lastName}</h3>

      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={(e) =>
          setForm({ ...form, firstName: e.target.value })
        }
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={(e) =>
          setForm({ ...form, lastName: e.target.value })
        }
      />

      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <button onClick={updateEmployees}>Update Employee</button>
    </>
  );
}
