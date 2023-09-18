import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


const Guest = ({ Component }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            navigate('/');
        }
    })

    return (
        <Component />
    )
}

export default Guest;
