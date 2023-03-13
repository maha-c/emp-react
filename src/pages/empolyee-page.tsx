 import { useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "react-query";
// import { Employee, EmployeeForm, createEmployee, deleteEmployee, getEmployeeById, updateEmployee } from "../api/employee-request";


// interface EmployeePageProps {
//   id: number;
// }

// export function EmployeePage({ id }: EmployeePageProps) {
//   const queryClient = useQueryClient();

//   const [form, setForm] = useState<EmployeeForm>({
//     firstName: "",
//     lastName: "",
//     title: "",
//     email: "",
//   });

//   const getEmployeeQuery = useQuery(["employee", id], () => getEmployeeById(id));
//   const updateEmployeeMutation = useMutation(updateEmployee, {
//     onSuccess: () => queryClient.invalidateQueries("employees"),
//   });
//   const deleteEmployeeMutation = useMutation(deleteEmployee, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("employees");
//       //history.push("/");
//     },
//   });
//   const createEmployeeMutation = useMutation(createEmployee, {
//     onSuccess: () => queryClient.invalidateQueries("employees"),
//   });

//   const { isLoading, isError, data: employee } = getEmployeeQuery;

//   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const newEmployee: EmployeeForm = {
//       firstName: form.firstName,
//       lastName: form.lastName,
//       title: form.title,
//       email: form.email,
//     };

//     createEmployeeMutation.mutate(newEmployee);
//     setForm({
//       firstName: "",
//       lastName: "",
//       title: "",
//       email: "",
//     });
//   }

//   function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const updatedEmployee: Employee = {
//       id: employee?.id!,
//       firstName: form.firstName,
//       lastName: form.lastName,
//       title: form.title,
//       email: form.email,
//     };

//     updateEmployeeMutation.mutate(updatedEmployee);
//   }

//   function handleDelete() {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       deleteEmployeeMutation.mutate(employee?.id!);
//     }
//   }

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching employee</div>;
//   }

//   return (
//     <>
      
//       <h2>{employee?.firstName} {employee?.lastName}</h2>
//       <form onSubmit={handleUpdate}>
//         <label htmlFor="firstName">First Name:</label>
//         <input type="text" id="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
//         <label htmlFor="lastName">Last Name:</label>
//         <input type="text" id="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
//         <label htmlFor="title">Title:</label>
//         <input type="text" id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
//         <label htmlFor="email">Email:</label>
//         <input type="text" id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//         <button type="submit">Update Employee</button>
//       </form>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="firstName">First Name:</label>
//         <input type="text" id="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
//         <label htmlFor="lastName">Last Name:</label>
//         <input type="text" id="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
//         <label htmlFor="title">Title:</label>
//         <input type="text" id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
//         <label htmlFor="email">Email:</label>
//         <input type="text" id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//         <button type="submit">Create Employee</button>
//       </form>
//       <button onClick={handleDelete}>Delete Employee</button>
//     </>
//   );
// }
