import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Protected = ({ Component }) => {
    
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if(!token){
            navigate('/login');
        }
    })

    return (
            <Component/>
    )
}

export default Protected;
