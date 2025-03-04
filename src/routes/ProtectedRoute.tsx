import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({component}: {component:any}) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('jwtToken');
        if(!token) navigate('/login');
    }, [])
    
  return (
    <div>
      {component}
    </div>
  )
}

export default ProtectedRoute
