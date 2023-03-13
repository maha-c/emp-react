import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { EmployeeForm, createEmployee } from "../api/employee-request";
//import { NavBar } from "../components/navbar";


export function CreateEmployee() {

    const [form, setForm] = useState<EmployeeForm>({
        firstName: "",
        lastName: "",
        title: "",
        email: "",

    })

    const queryclient = useQueryClient();

    const createEmployeeMutation = useMutation(createEmployee, { onSuccess: () => queryclient.invalidateQueries("employeecache") });


    function addEmployee() {
        const newEmployee: EmployeeForm = {
            firstName: form.firstName,
            lastName: form.lastName,
            title: form.title,
            email: form.email,

        }

        createEmployeeMutation.mutate(newEmployee);
    }

    return <>

        <h1>Employee Creation</h1>

        <label htmlFor="firstName">FirstName</label>
        <input type="text" id="firstName" placeholder="Nate" onChange={e => setForm({ ...form, firstName: e.target.value })} />

        <label htmlFor="lastName">lastName</label>
        <input type="text" id="lastName" placeholder="Smith" onChange={e => setForm({ ...form, lastName: e.target.value })} />

        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="Associate" onChange={e => setForm({ ...form, title: e.target.value })} />

        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="natesmith@hotmail.com" onChange={e => setForm({ ...form, email: e.target.value })} />

        <button onClick={addEmployee}>Add Employee</button>
    </>

}

function invalidateQueries(arg0: string): void | Promise<unknown> {
    throw new Error("Function not implemented.");
}
