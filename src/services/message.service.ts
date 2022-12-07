import MessageDispatcher, { MessageService } from '@uncover/js-utils-microfrontend'

MessageDispatcher.start('MED')
const MessageServiceCentral = new MessageService('MES')

export default MessageServiceCentral