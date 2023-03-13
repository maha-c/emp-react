export type Employee = {
    id: number,
    firstName: string,
    lastName: string,
    title: string,
    email: string
}

export type EmployeeForm = {
    firstName: string,
    lastName: string,
    title: string,
    email: string,
    

}
export const url = "http://127.0.0.1:8081";

export async function getAllEmployees():Promise<Employee[]> {
    const response = await (await (fetch(`${url}/employees`))).json()
    return response;
}

export async function getEmployeeById(id: number):Promise<Employee> {
    const response = await (await (fetch(`${url}/employees/` + id))).json()
    return response;
}
export async function getEmployeeByName(firstName: string):Promise<Employee> {
    const response = await (await (fetch(`${url}/employees/name` + firstName))).json()
    return response;
}

export async function createEmployee(newEmp: EmployeeForm):Promise<Employee> {
    const response = await (await (fetch(`${url}/employees`,{
        method: "POST",
        body:JSON.stringify(newEmp),
        headers: {
            "Content-Type":"application/json"
        }
    }))).json();
    return response;
}

export async function updateEmployee(emp: Employee):Promise<Employee> {
    const response = await fetch(`${url}/employees`,{
        method: "PUT",
        body:JSON.stringify(emp),
        headers: {
            "Content-Type":"application/json"
        }
    })
    const employee: Employee = await response.json()
    console.log(`Employee data: ${JSON.stringify(employee)}`);
    return employee;
}
// export async function deleteEmployee(id: number):Promise<boolean> {
//     const response = await fetch(`${url}/employees` + id ,{
//         method: "DELETE",
//         headers: {
//             "Content-Type":"application/json"
//         }
//     })
//     const b: boolean = await response.json()
//     return b;
// }

export async function deleteEmployee(id: number): Promise<any> {
    const response = await fetch(`${url}/employees/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to delete employee');
    }
  }
  






