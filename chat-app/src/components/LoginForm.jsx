import { Users } from 'lucide-react'
import React, { useState } from 'react'

const LoginForm = ({onLogin}) => {
const [username,setUsername] = useState("")
const [isLoading,setIsLoading] = useState(false)
const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
      onLogin(username.trim());
      setIsLoading(false);
    }
  };
    return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50-to-indigo-100 flex items-center justify-center'>
        <div className='bg-white rounded-2xl shawdow-xl p-8 w-full max-w-md'>
       <div className='w-full text-center mb-8'>
  <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4'>
      <Users/>
  </div>
  <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome to the Chat</h1>
  <p className='text-gray-600'>Enter your username to start chatting</p>
</div>

            <form onSubmit={handleSubmit} className='space-y-6'>
             <div className='relative flex justify-center'>
  <input
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder='Enter your username'
    required
    maxLength={20}
    className='px-4 py-2 border border-gray-200 rounded-md w-3/4 text-center'
  />
  <button className='w-24 border rounded-lg ml-3 bg-blue-600 text-white'>join</button>
</div>

            </form>
        </div>
      
    </div>
  )
}
export default LoginForm
