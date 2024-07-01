import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../home/backgroundImage/background.JPG';

const GameSelection = () => {
  const navigate = useNavigate();

  const handlePicasYFijas = () => {
    navigate('/picas-y-fijas');
  };

  return (
    <div
      className="game-selection d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        height: '100vh',
        color: '#ffffff', // Color de texto blanco para todo el contenido
        fontFamily: 'Arial, sans-serif', // Establecer la fuente deseada para todo el contenido
      }}
    >
      <button
        className="btn btn-primary"
        style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1', color: '#ffffff' }}
        onClick={handlePicasYFijas}
      >
        Picas y Fijas
      </button>
    </div>
  );
};

export default GameSelection;
