import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

const Guest = ({ Component }) => {
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            navigate('/');
        }
    },[navigate,location])

    return (
        <Component />
    )
}

export default Guest;
