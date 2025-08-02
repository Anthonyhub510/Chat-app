import { useEffect, useRef } from "react";
import MessageComponent from "./MessageComponent";


export const MessageList = ({ 
  messages, 
  currentUsername, 
  isTyping,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  console.log(messages)
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((message) =>(
        <MessageComponent
          key={message.id}
          message={message}
          isOwn={message.username === currentUsername}
        />
      ))}
      
      {isTyping.length > 0 && (
        <div className="flex justify-start">
          <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg rounded-bl-none">
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-xs ml-2">
                {isTyping.join(', ')} {isTyping.length === 1 ? 'is' : 'are'} typing...
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};
