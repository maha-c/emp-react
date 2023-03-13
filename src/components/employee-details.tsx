import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { getEmployeeById, updateEmployee, deleteEmployee, Employee } from "../api/employee-request";

type EmployeeDetailsProps = {
    selectedEmployeeId: number;
}


//export function EmployeeDetails( selectedEmployeeId :number ) {
export function EmployeeDetails({ selectedEmployeeId }: EmployeeDetailsProps) {

    const queryclient = useQueryClient();


    const { isLoading, isError, data = {} } = useQuery(
        ["employeecache", selectedEmployeeId], () => getEmployeeById(selectedEmployeeId));

    const [employee, setEmployee] = useState<Employee>({
        id: 0,
        firstName: '',
        lastName: '',
        title: '',
        email: '',
    });

    const [isUpdated, setIsUpdated] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        setEmployee(data as Employee);
    }, [data]);

    function handleChange(event: { target: { name: any; value: any; }; }) {
        setEmployee((prevEmployee) => ({...prevEmployee,[event.target.name]: event.target.value,}));
    }

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        updateEmployee(employee).then(() => {
            console.log("Employee updated");
            setIsUpdated(true);
            queryclient.invalidateQueries("employeecache");
        });
    }

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isUpdated || isDeleted) {
            timer = setTimeout(() => {
                setIsUpdated(false);
                setIsDeleted(false);
            }, 3000); // 3 seconds
        }
        return () => clearTimeout(timer);
    }, [isUpdated, isDeleted]);


    function handleDelete() {
        const confirmed = window.confirm(`Are you sure you want to delete employee with ID ${employee.id}?`);
        if (confirmed) {
            deleteEmployee(employee.id).then((response) => {
                console.log(response);
                if (response) {
                    console.log("Employee deleted");
                    setIsDeleted(true);
                    queryclient.invalidateQueries("employeecache");
                    setEmployee({
                        id: 0,
                        firstName: '',
                        lastName: '',
                        title: '',
                        email: '',
                    });
                }
            }).catch((error) => {
                console.error(error);
                alert('Failed to delete employee');
            });
        }
    }

    if (isLoading) {
        return <p>LOADING</p>;
    }

    if (isError) {
        return <p>OH NO THERE WAS A PROBLEM</p>;
    }

    return (
        <div>
            <h1>Employee Details</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:
                    <input type="text" value={employee.id} name="id" readOnly />
                </label>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={employee.firstName}
                        name="firstName"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={employee.lastName}
                        name="lastName"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Title:
                    <input
                        type="text"
                        value={employee.title}
                        name="title"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={employee.email}
                        name="email"
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>

            {isUpdated && <p>Employee updated successfully</p>}
            {isDeleted && <p>Employee deleted successfully</p>}

            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}
