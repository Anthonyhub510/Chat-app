import { useMemo } from "react"
import { useCallback, useEffect, useRef, useState } from "react"

export const useWebSocket = (url,username) => {
const [isConnected,setIsConnected] = useState(false)
const [messages,setMessages] = useState([])
const [users,setUsers] = useState([])
const [isTyping,setIsTyping] = useState([])

const ws = useRef()
const reconnectTimeout = useRef()
const typingTimeout = useRef()

const connect = useCallback(()=>{
    try {
        ws.current = new WebSocket(url)
        ws.current.onopen = ()=>{
            setIsConnected(true)
            ws.current?.send(JSON.stringify({
                type : "user_joined",
                data : {username}
            }))
        }
        ws.current.onmessage = (event)=>{
            const messages = JSON.parse(event.data)
            switch(messages.type){
                case  "message" : setMessages((prev)=>[
                    ...prev,messages.data
                ]) 
                break
                case "user_list" : setUsers(messages.data)
                break
                case  "typing_start" : setIsTyping((prev)=>[...prev.filter((u)=>u!== messages.data.username),messages.data.username])
                break
                 case  "typing_stop" : setIsTyping((prev)=>prev.filter((u)=>u!== messages.data.username))
                break
                case "user_joined" : setMessages((prev)=>[...prev,{
                    id : Date.now().toString(),
                    userId :"system",
                    username : `${messages.data.username } `,
                    content : `${messages.data.username } joined the chat`,
                    timestamp : new Date(),
                    type : "system"

                }])
                
                break
              case "user_left" : setMessages((prev)=>[...prev,{
                    id : Date.now().toString(),
                    userId :"system",
                    username : `${messages.data.username } `,
                    content : `${messages.data.username } left the chat`,
                    timestamp : new Date(),
                    type : "system"

                }])
                break
                
            }
        }
        ws.current.onclose = ()=>{
            setIsConnected(false)
            reconnectTimeout.current = setTimeout(()=>{
                connect()
            },3000)
        }
        ws.current.onerror = ()=>{
            setIsConnected(false)
        }
    }
    catch (error) {
       console.error("WebSocketConnectionError",error)
       setIsConnected(false) 
    }
},[username,url])
 const sendMessage = useCallback((content)=>{
    console.log(content)
    if(ws.current&&isConnected){
        const message = {
            type : "message",
            data : {
                id : Date.now().toString(),
                userId : Date.now().toString(),
                username ,
                content,
                timestamp : new Date(),
                type : "message"
            }
    }
    ws.current.send(JSON.stringify(message))
    }
 },[isConnected,username])

 const startTyping = useCallback(()=>{
    if(ws.current&&isConnected){
        ws.current.send(JSON.stringify({
            type : "typing_start",
            data : {username}
        }))
    }
 },[isConnected,username])
 const stopTyping = useCallback(()=>{
    if(ws.current&&isConnected){
        ws.current.send(JSON.stringify({
            type : "typing_stop",
            data : {username}
        }))
    }
 },[isConnected,username])
 const handleTyping = useCallback(()=>{
    startTyping()
    if(typingTimeout.current){
        clearTimeout(typingTimeout.current)
    }
    typingTimeout.current = setTimeout(() => {
        stopTyping()
        
    }, 1000);
 },[stopTyping,startTyping])
  useEffect(()=>{
    connect()
    return()=>{
        if(reconnectTimeout.current){
            clearTimeout(reconnectTimeout.current)
            
        }
        if(typingTimeout.current){
            clearTimeout(typingTimeout.current)
            
        }
        if(ws.current){
            ws.current.close()
        }
    }
  },[connect])
  const returnValue = useMemo(()=>({
     isConnected,messages,users,isTyping,sendMessage,handleTyping
  }),[ isConnected,messages,users,isTyping,sendMessage,handleTyping])
  return returnValue
}
