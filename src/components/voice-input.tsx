import {Button} from "@/components/ui/button";
import {MicOff, PhoneOff, Volume2} from "lucide-react";
import React, {Dispatch} from "react";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";

export default function VoiceInput(props: {
    isListening: boolean;
    setListening: Dispatch<boolean>;
    isMute: boolean;
    setMute: Dispatch<boolean>;
    isSpeaking: boolean;
    setSpeaking: Dispatch<boolean>;
    agentStatus: string;
}) {
    const toggleCall = () => {
        if (
            !props.agentStatus.toLowerCase().includes("start")
            && !props.agentStatus.toLowerCase().includes("idle")
            && !props.agentStatus.toLowerCase().includes("connect")) {
            props.setListening(!props.isListening);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative">
                <div
                    className={`w-64 h-64 rounded-full ${props.isListening ? "animate-spin" : ""}`}
                    style={{
                        background: "conic-gradient(from 0deg, #FF3366, #3399FF, #FF3366)",
                        animation: props.isListening ? "spin 2s linear infinite" : "none",
                    }}
                ></div>
                <div
                    className="absolute inset-2 h-[15rem] w-[15rem] bg-[#1A1D24] rounded-full flex items-center justify-center"
                    onClick={() => toggleCall()}>
                    <div className="text-center content-center flex flex-col justify-center items-center">
                        {/*<h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                            Ollie
                        </h2>
                        <Phone className={"text-primary justify-center mt-2"}/>*/}
                        <Image src={"/ollie.png"} alt={"Ollie"} width={500} height={500} />
                        {/*{props.isListening && (
                            <p className="text-gray-400 mt-2">{props.agentStatus[0]?.toUpperCase() + props.agentStatus?.slice(1)}</p>)}*/}
                    </div>
                </div>
                <AnimatePresence>
                    {props.isListening && (
                        <motion.div className="flex justify-center gap-6 mt-8"
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                        >
                            <Button size="icon" variant="secondary"
                                    className={`rounded-full hover:bg-[#2A2D35]/80 ${props.isMute ? "bg-destructive" : "bg-[#2A2D35]"}`}
                                    onClick={() => props.setMute(!props.isMute)}>
                                <MicOff className="w-5 h-5"/>
                            </Button>
                            <Button size="icon" variant="destructive" className="rounded-full" onClick={() => {
                                toggleCall()
                            }}>
                                <PhoneOff className="w-5 h-5"/>
                            </Button>
                            <Button size="icon" variant={(props.isSpeaking) ? "secondary" : "destructive"}
                                    className="rounded-full bg-[#2A2D35] hover:bg-[#2A2D35]/80" onClick={() => {
                                props.setSpeaking(!props.isSpeaking)
                            }}>
                                <Volume2 className="w-5 h-5"/>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
};