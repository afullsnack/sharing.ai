import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ai-chat/chat-bubble"
import { ChatMessageList } from "@/components/ai-chat/chat-message-list"
import { Container } from "@/components/craft"
import { AIChatInput } from "@/components/ui/ai-chat-input"
import { Card, CardContent } from "@/components/ui/card"

interface IChatProps { }


const messages = [
  {
    id: 1,
    message: 'Test message',
    sender: 'ai'
  },
  {
    id: 2,
    message: 'Request message for ai to carry out tasks',
    sender: 'user'
  },
  {
    id: 3,
    message: 'Follow up message',
    sender: 'user'
  },
  {
    id: 4,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 4,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 4,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 4,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 4,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 4,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 4,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 4,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 4,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 4,
    message: 'Long Test message',
    sender: 'ai'
  },
]
export default function Chat(props: IChatProps) {
  console.log('Chat props', props)

  return (
    <Container className="h-[70vh] !p-0">
      <Card>
        <CardContent className="bg-muted-forground px-4">
          <ChatMessageList>
            {
              messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  variant={message.sender === "user" ? 'sent' : 'received'}
                >
                  <ChatBubbleAvatar
                    className="h-8 w-8 shrink-0"
                    // src={
                    //   message.sender === "user"
                    //     ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop"
                    //     : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                    // }
                    fallback={message.sender === "user" ? "US" : "AI"}
                  />
                  <ChatBubbleMessage
                    variant={message.sender === "user" ? "sent" : "received"}
                  >
                    {message.message}
                  </ChatBubbleMessage>
                </ChatBubble>
              ))
            }
          </ChatMessageList>
          <AIChatInput />
        </CardContent>
      </Card>
    </Container>
  )
} 
