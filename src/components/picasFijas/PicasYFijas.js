import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PicasYFijas = () => {
  const [userNumber, setUserNumber] = useState('');
  const [userGuesses, setUserGuesses] = useState([]);
  const [machineNumber, setMachineNumber] = useState('');
  const [machineGuesses, setMachineGuesses] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [possibleGuesses, setPossibleGuesses] = useState([]);
  const [isUserTurn, setIsUserTurn] = useState(true);

  const navigate = useNavigate();
  const machineStartTime = useRef(Date.now());

  const generateRandomNumber = (digits) => {
    let number = '';
    for (let i = 0; i < digits; i++) {
      const digit = Math.floor(Math.random() * 10);
      number += digit.toString();
    }
    return number;
  };

  const generateAllPossibleGuesses = (digits) => {
    const generateCombinations = (prefix, length) => {
      if (length === 0) return [prefix];
      let combinations = [];
      for (let i = 0; i < 10; i++) {
        combinations = combinations.concat(generateCombinations(prefix + i, length - 1));
      }
      return combinations;
    };
    return generateCombinations('', digits);
  };

  const handleStartGame = (event) => {
    event.preventDefault();
    const number = event.target.userNumber.value.trim();
    if (number.length !== 3 + currentLevel || isNaN(number)) {
      alert(`Por favor ingresa un número válido de ${3 + currentLevel} dígitos.`);
      return;
    }
    setUserNumber(number);
    setMachineNumber(generateRandomNumber(3 + currentLevel));
    setIsGameStarted(true);
    setPossibleGuesses(generateAllPossibleGuesses(3 + currentLevel));
    setIsUserTurn(true);
    machineStartTime.current = Date.now();
  };

  const handleUserGuess = (event) => {
    event.preventDefault();
    if (!isUserTurn) return;
    const guess = event.target.guess.value.trim();
    if (guess.length !== 3 + currentLevel || isNaN(guess)) {
      alert(`Por favor ingresa un número válido de ${3 + currentLevel} dígitos.`);
      return;
    }
    const { picas, fijas } = getPicasAndFijas(guess, machineNumber);
    setUserGuesses([...userGuesses, { guess, picas, fijas }]);
    if (fijas === 3 + currentLevel) {
      alert('¡Ganaste! Adivinaste el número de la máquina.');
      handleLevelUp();
    } else {
      setIsUserTurn(false);
      setTimeout(() => handleMachineGuess({ picas, fijas }), 1000);
    }
  };

  const handleMachineGuess = (result) => {
    if (!userNumber) {
      console.error('userNumber no está definido');
      return;
    }
    const elapsedTime = Date.now() - machineStartTime.current;
    const maxTime = 0.5 * 60 * 1000;

    let updatedGuesses = possibleGuesses.filter(guess => {
      const { picas, fijas } = getPicasAndFijas(guess, userNumber);
      return picas === result.picas && fijas === result.fijas;
    });

    if (updatedGuesses.length === 0 || elapsedTime > maxTime) {
      updatedGuesses = possibleGuesses; // Forzar conjetura si excede el tiempo o no hay conjeturas posibles
    }

    setPossibleGuesses(updatedGuesses);
    const machineGuess = updatedGuesses[Math.floor(Math.random() * updatedGuesses.length)];
    const { picas, fijas } = getPicasAndFijas(machineGuess, userNumber);
    setMachineGuesses([...machineGuesses, { guess: machineGuess, picas, fijas }]);
    
    if (fijas === 3 + currentLevel) {
      alert('La máquina adivinó tu número.');
      setIsGameStarted(false);
      setCurrentLevel(1);
      setMachineNumber('');
      setUserNumber('');
      setUserGuesses([]);
      setMachineGuesses([]);
    } else {
      setIsUserTurn(true);
      machineStartTime.current = Date.now(); // Reiniciar el tiempo para la siguiente conjetura
    }
  };

  const getPicasAndFijas = (guess, target) => {
    if (!guess || !target) {
      console.error('guess o target no está definido');
      return { picas: 0, fijas: 0 };
    }
    let picas = 0;
    let fijas = 0;
    let targetDigitsCount = {};
    for (let char of target) {
      targetDigitsCount[char] = (targetDigitsCount[char] || 0) + 1;
    }
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === target[i]) {
        fijas++;
        targetDigitsCount[guess[i]]--;
      }
    }
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] !== target[i] && target.includes(guess[i]) && targetDigitsCount[guess[i]] > 0) {
        picas++;
        targetDigitsCount[guess[i]]--;
      }
    }
    return { picas, fijas };
  };

  const handleLevelUp = () => {
    if (currentLevel === 10) {
      alert('¡Has completado todos los niveles! Juego terminado.');
      setIsGameStarted(false);
      setCurrentLevel(1);
    } else {
      setCurrentLevel(currentLevel + 1);
    }
    setIsGameStarted(false);
    setUserNumber('');
    setMachineNumber('');
    setUserGuesses([]);
    setMachineGuesses([]);
  };

  return (
    <div>
      <button onClick={() => navigate('/')}>Volver al Home</button>
      <h1>Picas y Fijas - Nivel {currentLevel}</h1>
      {!isGameStarted ? (
        <form onSubmit={handleStartGame}>
          <label>
            Ingresa tu número de {3 + currentLevel} dígitos para que la máquina lo adivine:
            <input type="text" name="userNumber" maxLength={3 + currentLevel} required />
          </label>
          <button type="submit">Iniciar Juego</button>
        </form>
      ) : (
        <div>
          {isUserTurn ? (
            <form onSubmit={handleUserGuess}>
              <label>
                Adivina el número de la máquina:
                <input type="text" name="guess" maxLength={3 + currentLevel} required />
              </label>
              <button type="submit">Adivinar</button>
            </form>
          ) : (
            <p>La máquina está adivinando...</p>
          )}
          <div>
            <h2>Intentos del Usuario</h2>
            <ul>
              {userGuesses.map((guess, index) => (
                <li key={index}>
                  {guess.guess} - Picas: {guess.picas}, Fijas: {guess.fijas}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Intentos de la Máquina</h2>
            <ul>
              {machineGuesses.map((guess, index) => (
                <li key={index}>
                  {guess.guess} - Picas: {guess.picas}, Fijas: {guess.fijas}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PicasYFijas;
