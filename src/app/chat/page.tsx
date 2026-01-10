"use client"
import { Fragment, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { GlobeIcon, Loader } from 'lucide-react';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message';


export default function RAGChatBot() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();
  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text) return;
    sendMessage({ text: message.text })
    setInput("")
  }

  return <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh-4rem)]">
    <div className="flex flex-col h-full">
      <Conversation className='h-full'>
        <ConversationContent>
          {
            messages.map((message) => (
              <div key={message.id}>
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return <Fragment key={`${message.id}-${i}`}>
                        <Message from={message.role}>
                          <MessageContent>
                            {part.text}
                          </MessageContent>
                        </Message>
                      </Fragment>

                    default:
                      return null;
                  }
                })}
              </div>
            ))
          }
          {(status === 'submitted' || status === "streaming") && <Loader />}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInput onSubmit={handleSubmit} className="mt-4">
        <PromptInputBody>
          <PromptInputTextarea value={input} onChange={(e) => setInput(e.target.value)} />
        </PromptInputBody>
        <PromptInputTools>

        </PromptInputTools>
        <PromptInputFooter>
          <PromptInputSubmit></PromptInputSubmit>
        </PromptInputFooter>
      </PromptInput>
    </div>
  </div>
}