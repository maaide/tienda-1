import { IMessage } from '@/interfaces'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsChatDots } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'
import { v4 as uuidv4 } from 'uuid'

export const Chat = () => {

  const [chatDisplay, setChatDisplay] = useState('hidden')
  const [chatOpacity, setChatOpacity] = useState('opacity-0')
  const [chat, setChat] = useState<IMessage[]>([{
    agent: false,
    response: '¡Hola! Mi nombre es Maaibot y soy un asistente virtual de la tienda Maaide, ¿En que te puedo ayudar?'
  }])
  const [newMessage, setNewMessage] = useState('')

  const getMessages = async () => {
    if (localStorage.getItem('chatId')) {
      const senderId = localStorage.getItem('chatId')
      const response = await axios.get(`https://server-production-e234.up.railway.app/chat/${senderId}`)
      setChat(response.data)
    }
  }

  useEffect(() => {
    getMessages()
  }, [])

  const inputChange = (e: any) => {
    setNewMessage(e.target.value)
  }

  const submitMessage = async (e: any) => {
    e.preventDefault()
    let senderId
    let message = newMessage
    setNewMessage('')
    setChat(chat.concat({agent: false, message: message}))
    if (localStorage.getItem('chatId')) {
      senderId = localStorage.getItem('chatId')
    } else {
      senderId = uuidv4()
      localStorage.setItem('chatId', senderId)
    }
    if (chat.length === 1) {
      await axios.post('https://server-production-e234.up.railway.app/chat/create', { senderId: senderId, response: chat[0].response })
    }
    const response = await axios.post('https://server-production-e234.up.railway.app/chat', { senderId: senderId, message: newMessage })
    setChat(chat.filter(mes => mes.message === message))
    setChat(chat.concat(response.data))
  }

  return (
    <div className='fixed bottom-8 right-8 z-50 flex flex-col gap-6'>
      <div className={`${chatDisplay} ${chatOpacity} p-4 justify-between flex-col gap-4 transition-opacity duration-200 bg-white shadow-md w-96 h-[600px] rounded-xl dark:bg-main`}>
        <div className='flex flex-col gap-2'>
          {
            chat?.length
              ? chat.map(info => (
                <div key={info.response} className='flex flex-col gap-2'>
                  {
                    info.message
                      ? (
                        <div className='flex flex-col gap-2'>
                          <div className='bg-button text-white p-1.5 rounded-md w-fit ml-auto'><p>{info.message}</p></div>
                        </div>
                      )
                      : ''
                  }
                  {
                    info.response
                      ? (
                        <div className='flex flex-col gap-2'>
                          <div className='bg-main text-white p-1.5 rounded-md w-fit'><p>{info.response}</p></div>
                        </div>
                      )
                      : ''
                  }
                </div>
              ))
              : ''
          }
        </div>
        <form className='flex gap-2'>
          <input onChange={inputChange} value={newMessage} type='text' placeholder='Mensaje' className='border w-full p-1.5 rounded-md dark:border-neutral-600' />
          <button type='submit' onClick={submitMessage} className='bg-main text-white w-24 rounded-md dark:bg-neutral-700'>Enviar</button>
        </form>
      </div>
      <button onClick={(e: any) => {
        e.preventDefault()
        if (chatDisplay === 'hidden') {
          setChatDisplay('flex')
          setTimeout(() => {
            setChatOpacity('opacity-1')
          }, 50)
        } else {
          setChatOpacity('opacity-0')
          setTimeout(() => {
            setChatDisplay('hidden')
          }, 200)
        }
      }} className='w-14 h-14 bg-main flex rounded-full ml-auto shadow-md'>
        {
          chatOpacity === 'opacity-0'
            ? <BsChatDots className='text-3xl text-white m-auto' />
            : <IoCloseOutline className='text-3xl text-white m-auto' />
        }
      </button>
    </div>
  )
}
