// Register.jsx
import React, { useState } from 'react';
import { getDatabase, ref, set, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { database } from './firebase'; // Ensure the correct path

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please fill out both fields');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const db = getDatabase();
      const usersRef = ref(db, 'users');
      const newUserRef = push(usersRef);
      await set(newUserRef, {
        username: username,
        password: hashedPassword
      });
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
