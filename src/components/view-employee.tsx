import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Employee, getAllEmployees, getEmployeeById, updateEmployee } from "../api/employee-request";
import { EmployeeDetails } from "./employee-details";

export function GetEmployees() {

    const [emps, setEmps] = useState<Employee[]>([]);

    const { isLoading, isError } = useQuery("employeecache", getAllEmployees, {
        onSuccess: (data) => {
            setEmps(data);
        },
    });

    const [page, setPage] = useState(0);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);

    const queryClient = useQueryClient();

    const loadEmployeeMutation = useMutation(getEmployeeById, {
        onSuccess: () => queryClient.invalidateQueries("employeecache"),
    });

    function loadEmployee(id: number) {
        setSelectedEmployeeId(id);
        //loadEmployeeMutation.mutate(id);
    }

    if (isLoading) {
        return <p>LOADING</p>;
    }

    if (isError) {
        return <p>OH NO THERE WAS A PROBLEM</p>;
    }

    const pageCount = Math.ceil(emps.length / 10);

    return (
        <>
            <h1>Employee Viewer</h1>

            <p>Total Records: {emps.length}</p>
            <table style={{ borderCollapse: "collapse", border: "1px solid black" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black" }}>ID</th>
                        <th style={{ border: "1px solid black" }}>First Name</th>
                        <th style={{ border: "1px solid black" }}>Last Name</th>
                        <th style={{ border: "1px solid black" }}>Title</th>
                        <th style={{ border: "1px solid black" }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {emps.slice(page * 10, page * 10 + 10).map((e) => (
                        <tr key={e.id} style={{ border: "1px solid black" }}>
                            <td style={{ border: "1px solid black" }}>
                                <a href="#" onClick={() => loadEmployee(e.id)}>
                                    {e.id}
                                </a>
                            </td>
                            <td style={{ border: "1px solid black" }}>{e.firstName}</td>
                            <td style={{ border: "1px solid black" }}>{e.lastName}</td>
                            <td style={{ border: "1px solid black" }}>{e.title}</td>
                            <td style={{ border: "1px solid black" }}>{e.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {Array.from(Array(pageCount)).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i)}
                        // style={{
                        //     backgroundColor: page === i ? "blue" : "white",
                        //     color: page === i ? "white" : "black",
                        //     border: "1px solid black",
                        //     padding: "5px 10px",
                        //     margin: "0 5px",
                        //     cursor: "pointer",
                        // }}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            {selectedEmployeeId !== 0 && <EmployeeDetails selectedEmployeeId={selectedEmployeeId} />}
        </>
    );
}
