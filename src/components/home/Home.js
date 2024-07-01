import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './backgroundImage/background.JPG';

const Home = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePlayWithMachine = () => {
    if (username.trim()) {
      localStorage.setItem('username', username);
      navigate('/game-selection');
    } else {
      alert('Por favor, ingresa un nombre de usuario.');
    }
  };

  return (
    <div
      className="home d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <div className="card p-4 text-center" style={{ backgroundColor: 'rgba(3, 2, 5, 0.6)' }}>
        <label className="text-white" style={{ marginBottom: '0.5rem', display: 'block' }}>
          <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Nombre de usuario:</span>
          <input
            type="text"
            className="form-control mt-1"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', textAlign: 'center' }}
            value={username}
            onChange={handleInputChange}
          />
        </label>
        <button
          className="btn btn-primary mt-3"
          style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1', width: '100%' }}
          onClick={handlePlayWithMachine}
        >
          Jugar con la máquina
        </button>
      </div>
    </div>
  );
};

export default Home;


//<button>Jugar con otra persona</button>