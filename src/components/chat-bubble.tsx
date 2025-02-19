import {Card} from "@/components/ui/card";
import {Role, Transcript} from "ultravox-client";

interface ChatBubbleProps {
    message: string
    avatar: string
    name: string
}

export function ChatBubble({message, name}: ChatBubbleProps) {
    return (
        <div className="flex items-start space-x-3 max-w-md mx-auto bg-secondary/50 backdrop-blur-sm rounded-lg p-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-primary flex-shrink-0"/>
            <div className="flex-col">
                <div className="font-medium text-sm text-primary mb-1 text-left">{name}</div>
                <p className="text-foreground/90">{message}</p>
            </div>
        </div>
    )
}

export function ChatMessages(props: { messages: Transcript[] | null }) {
    return (<>
            {props.messages && (
                <Card className="bg-[#1A1D24]/50 backdrop-blur-md p-6 rounded-2xl mt-6 max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Conversation</h2>

                    <div className="space-y-4">
                        {props.messages?.map((message:Transcript) => {
                            return (
                                <div key={message.text}
                                     className={`p-4 rounded-xl w-fit h-fit ${(message?.speaker == Role.USER) ? " content-end bg-primary text-foreground" : "content-center bg-secondary text-foreground"}`}>
                                    <p>{message?.text}</p>
                                </div>
                            )
                        })}
                    </div>
                </Card>)}
        </>
    )
}

