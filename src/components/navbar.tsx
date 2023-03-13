import {Link} from "react-router-dom"


export function NavBar(){
    const router = useNavigate()

    return <>
        <Link to="/">Home</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/services">Services</Link>
        
    </>
}

function useNavigate() {
    throw new Error("Function not implemented.")
}
