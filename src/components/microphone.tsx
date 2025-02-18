import {Mic} from "lucide-react";

export function Microphone(){
    return (
        <button
            className="w-32 h-32 mx-auto backdrop-blur-md rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 flex items-center justify-center microphone-button group">
            <Mic className="w-12 h-12 text-primary group-hover:scale-110 transition-transform"/>
        </button>
    )
}