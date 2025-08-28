import { Send, SmilePlus } from "lucide-react";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export const MessageInput = ({ 
  onSendMessage, 
  onTyping, 
  isConnected 
}) => {
  const [message, setMessage] = useState('');
  const [showPicker, setShowpicker] = useState(false);
  const [emoji, setEmoji] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      onSendMessage(message.trim());
      setMessage('');
      setEmoji('')
      setShowpicker(false)
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    onTyping();
  };

  const handleEmojiSelect = (emojiObject) => {
      setEmoji(emojiObject.emoji)
   console.log(emoji)   
   setMessage(message+emoji)
   
  }
  
  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
     {
       showPicker&&<EmojiPicker width={600} height={400} onEmojiClick={handleEmojiSelect} /> 
     }
  <div className="flex items-center space-x-2">
   <button
  type="button"
  onClick={()=>setShowpicker(!showPicker)}
  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
>
  <SmilePlus />
</button>


    <input
      type="text"
      value={message}
      onChange={handleInputChange}
      placeholder={isConnected ? "Type a message..." : "Connecting..."}
      disabled={!isConnected}
      className="flex-1 rounded-full px-4 py-2 border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 disabled:bg-gray-100 "
    />

  {
      message.trim() ? (
          <button
      type="submit"
      disabled={!message.trim() || !isConnected}
      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
     >
      <Send size={20} />
    </button>
      ):
      (
          <button
      type="submit"
      disabled={!message.trim() || !isConnected}
      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
     >
      <Send size={20} />
    </button>
      )
  }
  </div>
</form>

  );
};
