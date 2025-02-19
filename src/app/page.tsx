"use client"

import {useCallback, useEffect, useRef, useState} from "react"
import {Card} from "@/components/ui/card"
import VoiceInput from "@/components/voice-input";
import OrderDetails from "@/components/orders";
import {Menu} from "@/components/menu";
import {CallConfig, MenuItem, pizzarooConfig} from "@/lib/types";
import {getSystemPrompt, selectedTools} from "@/lib/agent-config";
import {Transcript, UltravoxExperimentalMessageEvent, UltravoxSessionStatus} from "ultravox-client";
import {endCall, startCall} from "@/lib/callFuncs";

const menuItems: MenuItem[] = [
    {
        category_name: 'Pizza',
        category_avatar: '/file.svg', // Emoji for pizza
        description: 'Our special pizza menu with delicious crust and toppings.',
        items: [
            {
                id: 'p1',
                name: 'Margherita Pizza',
                description: 'Classic pizza with mozzarella, tomatoes, and basil.',
                price: 10.99,
                image: '/file.svg',
            },
            {
                id: 'p2',
                name: 'Pepperoni Pizza',
                description: 'Pizza topped with spicy pepperoni and mozzarella.',
                price: 12.99,
                image: '/file.svg',
            },
            {
                id: 'p3',
                name: 'BBQ Chicken Pizza',
                description: 'BBQ sauce, chicken, red onions, and mozzarella.',
                price: 14.99,
                image: '/file.svg',
            },
        ],
    },
    {
        category_name: 'Drinks',
        category_avatar: '/file.svg', // Emoji for drinks
        description: 'A variety of refreshing drinks to go with your meal.',
        items: [
            {
                id: 'd1',
                name: 'Coca Cola',
                description: 'Classic fizzy cola drink.',
                price: 2.49,
                image: 'file.svg',
            },
            {
                id: 'd2',
                name: 'Lemonade',
                description: 'Freshly squeezed lemonade with a hint of mint.',
                price: 3.49,
                image: '/file.svg',
            },
            {
                id: 'd3',
                name: 'Iced Tea',
                description: 'Cool and refreshing iced tea, served with lemon.',
                price: 2.99,
                image: '/file.svg',
            },
        ],
    },
    {
        category_name: 'Sides',
        category_avatar: '/file.svg', // Emoji for sides (fries)
        description: 'Tasty sides to complement your meal.',
        items: [
            {
                id: 's1',
                name: 'French Fries',
                description: 'Crispy golden fries, salted to perfection.',
                price: 3.99,
                image: '/file.svg',
            },
            {
                id: 's2',
                name: 'Garlic Bread',
                description: 'Toasted bread with garlic butter and herbs.',
                price: 4.49,
                image: '/file.svg',
            },
            {
                id: 's3',
                name: 'Caesar Salad',
                description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.',
                price: 5.99,
                image: '/file.svg',
            },
        ],
    },
]

export default function OrderPage() {
    const config: pizzarooConfig = {
        title: "Dr. Donut",
        overview: "This agent has been prompted to facilitate orders at a fictional drive-thru called Dr. Donut.",
        callConfig: {
            systemPrompt: getSystemPrompt(menuItems),
            model: "fixie-ai/ultravox-70B",
            languageHint: "en",
            selectedTools: selectedTools,
            voice: "terrence",
            temperature: 0.4,
            maxDuration: "240s",
            timeExceededMessage: "This session will expire soon."
        },
    };

    const [isListening, setIsListening] = useState(false)
    const [agentStatus, setAgentStatus] = useState<string>('')
    const [callTranscript, setCallTranscript] = useState<Transcript[] | null>([])
    const [callDebugMessage, setCallDebugMessage] = useState<UltravoxExperimentalMessageEvent[]>([])
    const [customerProfileKey, setCustomerProfileKey] = useState<string | null>(null);

    const [isMute, setIsMute] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>("Pizza")
    const conversationRef = useRef<HTMLDivElement>(null)

    const handleStateChange = useCallback((status: UltravoxSessionStatus | string | undefined) => {
        if (status) {
            setAgentStatus(status)
        } else {
            setAgentStatus("")
        }
    }, [])

    const handleCallDebugMessages = useCallback((messages: UltravoxExperimentalMessageEvent) => {
        setCallDebugMessage(prevMsg => [...prevMsg, messages])
    }, [])

    const clearCustomerProfile = useCallback(() => {
        // This will trigger a re-render of CustomerProfileForm with a new empty profile
        setCustomerProfileKey(prev => prev ? `${prev}-cleared` : 'cleared');
    }, []);

    const handleTranscriptChange = useCallback((transcripts: Transcript[] | undefined) => {
        if (transcripts && transcripts.length > 0) {
            setCallTranscript([...transcripts])
        }
    }, [])

    const handleStartCall = async () => {
        try {
            handleStateChange('Starting Call...')
            setCallTranscript(null)
            setCallDebugMessage([])
            clearCustomerProfile()

            const newKey = `call-${Date.now()}`;
            setCustomerProfileKey(newKey);

            let callConfig: CallConfig = {
                systemPrompt: config.callConfig.systemPrompt,
                model: config.callConfig.model,
                languageHint: config.callConfig.languageHint,
                voice: config.callConfig.voice,
                temperature: config.callConfig.temperature,
                maxDuration: config.callConfig.maxDuration,
                timeExceededMessage: config.callConfig.timeExceededMessage,
            }
            const paramOverride = {
                "callId": newKey
            }

            let cpTools = config?.callConfig?.selectedTools?.find(tool => tool.toolName === "createProfile");
            if (cpTools) {
                cpTools.parameterOverrides = paramOverride
            }
            callConfig.selectedTools = config.callConfig.selectedTools
            callConfig.systemPrompt = getSystemPrompt(menuItems)

            console.log(config.callConfig.systemPrompt)

            await startCall({
                onStatusChange: handleStateChange,
                onTranscriptChange: handleTranscriptChange,
                onDebugMessage: handleCallDebugMessages
            }, callConfig, true)

        } catch (e) {
            console.log(e)
        }
    }
    const handleEndCallButtonClick = async () => {
        try {
            handleStateChange('Ending Call...')
            await endCall();
            setIsListening(false);

            clearCustomerProfile();
            setCustomerProfileKey(null);
            handleStateChange('Call ended successfully');
        } catch (error) {
            handleStateChange(`Error ending call: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    useEffect(() => {
        if (conversationRef.current)
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }, [callTranscript])

    return (
        <div className="mt-16 text-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-[350px_1fr_350px] gap-6 max-w-7xl mx-auto">
                {/* Menu Section */}
                <Menu menuItems={menuItems} category={selectedCategory} setCategory={setSelectedCategory}/>
                {/* Voice Assistant Section */}
                <div className="content-center" onClick={() => {
                    isListening ? handleEndCallButtonClick() : handleStartCall()
                }}>
                    <VoiceInput isListening={isListening} setListening={setIsListening} isMute={isMute}
                                setMute={setIsMute}
                                isSpeaking={isSpeaking} setSpeaking={setIsSpeaking}/></div>

                {/* Current Order Section */}
                <OrderDetails/>
            </div>

            {/* Conversation Section */}
            <Card className="bg-[#1A1D24]/50 backdrop-blur-md p-6 rounded-2xl mt-6 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Conversation</h2>

                <div className="space-y-4">
                    <div className="bg-[#2A2D35] p-4 rounded-xl">
                        <p>Hello! Welcome to Pizzaroo. I'm Ollie your Pizza ordering Agent. What would you like to order
                            today?</p>
                        <span className="text-sm text-gray-400 block mt-2">10:00 AM</span>
                    </div>

                    <div className="bg-[#2A2D35] p-4 rounded-xl ml-auto max-w-[80%]">
                        <p>I'd like to order a large Pepperoni Pizza</p>
                        <span className="text-sm text-gray-400 block mt-2">10:01 AM</span>
                    </div>
                </div>
            </Card>
        </div>
    )
}