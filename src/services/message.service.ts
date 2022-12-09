import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import { AnyAction } from '@reduxjs/toolkit'
import MessageDispatcher, { Message, MessageService } from '@uncover/js-utils-microfrontend'

MessageDispatcher.start('MED')
const MessageServiceCentral = new MessageService('MES')

export const useDispatchMessage = (dispatch?: Dispatch<AnyAction>) => {
  let dispatcher = dispatch || useDispatch()
  return (message: Message) => {
    dispatcher(message)
    MessageServiceCentral.sendMessage(message)
  }
}

export default MessageServiceCentral