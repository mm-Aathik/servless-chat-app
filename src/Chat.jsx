// Chat.jsx
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { database } from './firebase'; // Ensure the correct path

const Chat = ({ currentUser }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    if (!currentUser) return; // Ensure currentUser is defined

    const db = getDatabase();
    const messagesRef = ref(db, `messages/${currentUser.id}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesList = [];
      for (let recipientId in data) {
        for (let messageId in data[recipientId]) {
          messagesList.push(data[recipientId][messageId]);
        }
      }
      setMessages(messagesList);
    });
  }, [currentUser]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message || !recipient || !currentUser) {
      alert('Please enter a message and select a recipient');
      return;
    }

    const newMessage = {
      text: message,
      sender: currentUser.id,
      timestamp: Date.now()
    };

    try {
      const db = getDatabase();
      const messagesRef = ref(db, `messages/${currentUser.id}/${recipient}`);
      await push(messagesRef, newMessage);
      const recipientMessagesRef = ref(db, `messages/${recipient}/${currentUser.id}`);
      await push(recipientMessagesRef, newMessage);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>; // Or handle the case where currentUser is not defined
  }

  return (
    <div>
      <h2>Chat</h2>
      <div>
        <input
          type="text"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.sender}: {msg.text} ({new Date(msg.timestamp).toLocaleString()})</li>
          ))}
        </ul>
        <form onSubmit={sendMessage}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            cols="50"
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
