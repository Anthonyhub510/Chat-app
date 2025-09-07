import React, { useState } from 'react'

const MessageComponent = ({message,isOwn}) => {
    const[messageContent,setmessageContent]= useState(message)
    
        const formatTime = (date)=>{
    return new Date(date).toLocaleTimeString([],{
       hour:"2-digit",
       minute:"2-digit" 
    })
}
console.log(messageContent)

        if(message.type==="system"){
            return(
                <div className='flex justify-center my-2'>
                    <div className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm'>
                        {message.content}
                    </div>
                </div>
            )
        }
    
         return (
      <div className={`flex mb-4 ${isOwn ? "justify-end" : "justify-start"}`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isOwn ? "bg-blue-500 text-white rounded-br-none " : "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
          {!isOwn && (
            <div className='text-xs font-medium mb-1 opacity-70'>
              {message.username}
            </div>
          )}
          <audio controls>
            <source src={message.audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <div className={`text-xs mt-1 ${isOwn ? "text-blue-100 " : "text-gray-500"}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    );
  return (
    <div className={`flex mb-4 ${isOwn? "justify-end" :"justify-start"}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 
      rounded-lg ${isOwn? "bg-blue-500 text-white rounded-br-none " : "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
        {!isOwn&&(
            <div className='text-xs font-medium mb-1 opacity-70'>
                {message.username}
            </div>
        )}
        <div className='text-sm break-words'>{message.content}</div>
       {/* <audio src={URL.createObjectURL(message.audio)} controls /> */}
        <div className={`text-xs mt-1 ${isOwn? "text-blue-100 ":"text-gray-500"}`}>
            {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  )
}


export default MessageComponent
