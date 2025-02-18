import {Mic} from "lucide-react"
import {Navbar} from "@/components/navbar"
import {ChatBubble} from "@/components/chat-bubble"

export default function Home() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            <Navbar/>

            <div
                className="absolute inset-0 bg-[url('/bg-hero.png')] bg-cover bg-center"
                style={{filter: "brightness(0.3)"}}
            />

            <div className="relative pt-24 pb-20 container mx-auto px-4 content-center bg-opacity-50">
                <div className="text-center space-y-7 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter neon-glow">
                        Talk. Order. Enjoy
                        <span className="inline-block ml-2 transform -rotate-12">🍕</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-foreground/80">
                        Meet <span
                        className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-primary to-secondary">Ollie</span> -
                        Your Voice-Powered Pizza Buddy!
                    </p>

                    <button
                        className="w-32 h-32 mx-auto backdrop-blur-md rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 flex items-center justify-center microphone-button group">
                        <Mic className="w-12 h-12 text-primary group-hover:scale-110 transition-transform"/>
                    </button>

                    <p className="text-sm text-foreground/60">Tap to Start a Voice Call</p>

                    <div className="mt-12 bg-opacity-50">
                        <ChatBubble message="Hi! What would like to order today?" avatar="/ollie-avatar.png"
                                    name="Ollie"/>
                    </div>
                </div>
            </div>
        </main>
    )
}
