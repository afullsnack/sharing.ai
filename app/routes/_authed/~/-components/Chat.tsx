import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ai-chat/chat-bubble"
import { ChatMessageList } from "@/components/ai-chat/chat-message-list"
import { Container } from "@/components/craft"
import PromptForm from "@/components/forms/prompt"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface IChatProps { }


const messages = [
  {
    id: 1,
    message: 'Hello how can I help?',
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
    message: 'Long response message',
    sender: 'ai'
  },
  {
    id: 5,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 6,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 7,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 8,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 9,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 10,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 11,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 12,
    message: 'Long Test message',
    sender: 'ai'
  },
  {
    id: 13,
    message: 'Long Test message',
    sender: 'ai'
  },
]
export default function Chat(_props: IChatProps) {

  return (
    <Container className="!p-0">
      <Card className="h-[65dvh]">
        <CardContent className="bg-transparent p-0 h-full">
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
        </CardContent>
        <CardFooter className="flex items-center justify-center p-4">
          <Button>Setup agent workflow</Button>
        </CardFooter>
      </Card>
    </Container>
  )
} 
