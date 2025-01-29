// Login.jsx
import React, { useState } from 'react';
import { getDatabase, ref, get, child } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { database } from './firebase'; // Ensure the correct path

const Login = ({setCurrentUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please fill out both fields');
      return;
    }

    try {
      const db = getDatabase();
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      const users = snapshot.val();

      for (let userId in users) {
        const user = users[userId];
        if (user.username === username) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            alert('Login successful!');
            navigate('/chat');
            return;
          }
        }
      }

      alert('Invalid username or password');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
