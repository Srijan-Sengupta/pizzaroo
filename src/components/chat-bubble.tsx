interface ChatBubbleProps {
  message: string
  avatar: string
  name: string
}

export function ChatBubble({ message, name }: ChatBubbleProps) {
  return (
    <div className="flex items-start space-x-3 max-w-md mx-auto bg-secondary/50 backdrop-blur-sm rounded-lg p-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-primary flex-shrink-0" />
      <div className="flex-col">
        <div className="font-medium text-sm text-primary mb-1 text-left">{name}</div>
        <p className="text-foreground/90">{message}</p>
      </div>
    </div>
  )
}

