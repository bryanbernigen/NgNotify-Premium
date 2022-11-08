import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './App.css';
import './index.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/home')
    }, 3000)
  }, []);

  return (
    <div className="indexCt">
      <Link to="/home" className="bigText">
        <img src="/Spotify_Logo_CMYK_Green.png" />
      </Link>
      <div className="redirect">Redirecting you to Home Page...</div>
    </div>
  )
}

export default App
