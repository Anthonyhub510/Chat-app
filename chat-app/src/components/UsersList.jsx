import { Circle, Users } from "lucide-react";

export const UserList = ({ users, currentUsername, isConnected }) => {
  return (
    <div className="w-64 bg-gray-50 border-l border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Users size={20} className="text-gray-600" />
        <h3 className="font-semibold text-gray-800">Online Users</h3>
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
      </div>
      
      <div className="space-y-2">
        {users.map((user) => (
          <div 
            key={user.id} 
            className={`flex items-center space-x-2 p-2 rounded-lg ${
              user.username === currentUsername ? 'bg-blue-100' : 'bg-white'
            }`}
          >
            <Circle 
              size={8} 
              className={`${user.isOnline ? 'text-green-500 fill-current' : 'text-gray-400'}`} 
            />
            <span className={`text-sm ${
              user.username === currentUsername ? 'font-medium text-blue-800' : 'text-gray-700'
            }`}>
              {user.username}
              {user.username === currentUsername && ' (you)'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};