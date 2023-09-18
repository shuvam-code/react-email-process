import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

const Protected = ({ Component }) => {
    
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if(!token){
            navigate('/login');
        }
    },[navigate,location])

    return (
            <Component/>
    )
}

export default Protected;
