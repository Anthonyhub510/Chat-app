import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import { MessageCircle } from 'lucide-react'
import ChatRoom from './components/ChatRoom';

const App = () => {
  const [username, setUsername] = useState(null);

  const handleLogin = (username) => {
    setUsername(username);
  };
  return (
   <div className="App">
      {username ? (
        <ChatRoom username={username} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
