
import { useWebSocket } from '../../hooks/useWebSocket'
import { MessageCircle, Wifi, WifiOff } from 'lucide-react'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { UserList } from './UsersList'

const ChatRoom = ({username}) => {
  const wsUrl = import.meta.env.VITE_BACKEND_URL
  const {
    isConnected,
    messages,
    users,
    isTyping,
    sendMessage,
    handleTyping 
  } = useWebSocket(wsUrl,username)
  console.log(username)
  console.log(messages)
    return (
  <div className="flex h-screen bg-white">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-full">
                <MessageCircle size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Chat Room</h1>
                <p className="text-sm text-gray-600">
                  {isConnected ? 'Connected' : 'Connecting...'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Wifi size={20} className="text-green-500" />
              ) : (
                <WifiOff size={20} className="text-red-500" />
              )}
              <span className="text-sm text-gray-600">
                {users.length} online
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <MessageList 
          messages={messages}
          currentUsername={username}
          isTyping={isTyping.filter(user => user !== username)}
        />

        {/* Message Input */}
        <MessageInput 
          onSendMessage={sendMessage}
          onTyping={handleTyping}
          isConnected={isConnected}
        />
      </div>

      {/* User List */}
      <UserList 
        users={users}
        currentUsername={username}
        isConnected={isConnected}
      />
    </div>
  )
}

export default ChatRoom
