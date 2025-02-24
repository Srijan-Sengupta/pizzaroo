"use client"

import React, {useCallback, useEffect, useRef, useState} from "react"
import VoiceInput from "@/components/voice-input";
import OrderDetails from "@/components/orders";
import {Menu} from "@/components/menu";
import {CallConfig, MenuItem, pizzarooConfig} from "@/lib/types";
import {getSystemPrompt, selectedTools} from "@/lib/agent-config";
import {Role, Transcript, UltravoxExperimentalMessageEvent, UltravoxSessionStatus} from "ultravox-client";
import {endCall, startCall, toggleMute} from "@/lib/callFuncs";
import {ChatMessages} from "@/components/chat-bubble";
import {Button} from "@/components/ui/button";

const menuItems: MenuItem[] = [
    {
        category_name: 'Pizza',
        category_avatar: '/menu-pizza.svg', // Emoji for pizza
        description: 'Our special pizza menu with delicious crust and toppings.',
        items: [
            {
                id: 'p1',
                name: 'Pepperoni Pizza',
                description: 'Pizza topped with spicy pepperoni and mozzarella.',
                price: 14.99,
                image: '/pizza/Pepperoni.svg',
            },
            {
                id: 'p2',
                name: 'Margherita Pizza',
                description: 'Classic pizza with mozzarella, tomatoes, and basil.',
                price: 12.99,
                image: '/pizza/Margherita.svg',
            },
            {
                id: 'p3',
                name: 'BBQ Chicken Pizza',
                description: 'BBQ sauce, chicken, red onions, and mozzarella.',
                price: 15.99,
                image: '/pizza/BBQ Chicken.svg',
            },
            {
                id: 'p4',
                name: 'Veggie Supreme',
                description: 'Tomato sauce, bell peppers, onions, mushrooms, olives, spinach, and mozzarella.',
                price: 13.99,
                image: '/pizza/Veggie Supreme.svg'
            },
            {
                id: 'p7',
                name: 'Sicilian Pizza',
                description: 'Thick crust, marinara sauce, pepperoni, sausage, green peppers, onions, and mozzarella cheese.',
                price: 16.99,
                image: '/pizza/Sicilian.svg'
            },
            {
                id: 'p8',
                name: 'California Pizza',
                description: 'Olive oil base, fresh tomatoes, basil, mozzarella, goat cheese, and arugula.',
                price: 17.99,
                image: '/pizza/california.svg'
            },
            {
                id: 'p9',
                name: 'Chicago Pizza',
                description: 'Deep dish crust with layers of mozzarella, Italian sausage, marinara sauce, and a sprinkle of Parmesan.',
                price: 18.99,
                image: '/pizza/Chicago.svg'
            },
            {
                id: 'p10',
                name: 'Greek Pizza',
                description: 'Olive oil base, feta cheese, Kalamata olives, red onions, spinach, and tomatoes.',
                price: 14.99,
                image: '/pizza/greek.svg'
            }
        ],
    },
    {
        category_name: 'Drinks',
        category_avatar: '/menu-drinks.svg', // Emoji for drinks
        description: 'A variety of refreshing drinks to go with your meal.',
        items: [
            {
                id: 'd1',
                name: 'Pepsi',
                description: 'Refreshing carbonated cola beverage.',
                price: 2.99,
                image: '/drinks/Pepsi.svg'
            },
            {
                id: 'd2',
                name: 'Dr. Pepper',
                description: 'A unique blend of 23 flavors in a carbonated soft drink.',
                price: 2.99,
                image: '/drinks/Dr Pepper.svg'
            },
            {
                id: 'd3',
                name: 'Mountain Dew',
                description: 'Citrusy, refreshing carbonated soft drink with a kick of energy.',
                price: 2.99,
                image: '/drinks/Mountain Dew.svg'
            },
            {
                id: 'd4',
                name: 'Sprite',
                description: 'Crisp, lemon-lime flavored carbonated soft drink.',
                price: 2.99,
                image: '/drinks/Sprite.svg'
            },
            {
                id: 'd5',
                name: 'Fanta',
                description: 'Fruity and sweet carbonated soft drink available in a variety of flavors.',
                price: 2.99,
                image: '/drinks/Fanto.svg'
            },
            {
                id: 'd6',
                name: 'Schweppes',
                description: 'Crisp, refreshing carbonated drink with a variety of flavors like ginger ale and tonic water.',
                price: 2.99,
                image: '/drinks/Schweppes.svg'
            },
            {
                id: 'd7',
                name: 'Coca Cola',
                description: 'Classic fizzy cola drink.',
                price: 2.49,
                image: '/drinks/Coke.svg',
            },
            {
                id: 'd8',
                name: 'Iced Tea',
                description: 'Cool and refreshing iced tea, served with lemon.',
                price: 2.99,
                image: '/drinks/Canadian Dry.svg',
            },
        ],
    },
    {
        category_name: 'Sides',
        category_avatar: '/menu-sides.svg',
        description: 'Tasty sides to complement your meal.',
        items: [
            {
                id: 's1',
                name: 'Pudding',
                description: 'Creamy, smooth vanilla pudding topped with a hint of caramel or chocolate.',
                price: 3.99,
                image: '/sides/pudding 1.svg'
            },
            {
                id: 's2',
                name: 'Apple Pie',
                description: 'Warm, flaky crust filled with cinnamon-spiced apples and a sweet, buttery filling.',
                price: 4.99,
                image: '/sides/apple pie 1.svg'
            },
            {
                id: 's3',
                name: 'Ice Cream',
                description: 'Rich and creamy vanilla ice cream, with options for chocolate, strawberry, or toppings.',
                price: 3.99,
                image: '/sides/ice cream 1.svg'
            },
            {
                id: 's4',
                name: 'Apfelstrudel',
                description: 'Traditional Austrian pastry filled with spiced apples, raisins, and cinnamon, wrapped in a flaky pastry crust.',
                price: 5.49,
                image: '/sides/Apfelstrudel.svg'
            },
            {
                id: 's5',
                name: 'Brownies',
                description: 'Rich, fudgy chocolate brownies with a soft, gooey center and a slightly crisp top.',
                price: 3.99,
                image: '/sides/Brownies.svg'
            },
            {
                id: 's6',
                name: 'Cannoli',
                description: 'Crispy, golden pastry shells filled with sweet ricotta cheese and chocolate chips, dusted with powdered sugar.',
                price: 4.99,
                image: '/sides/Cannoli.svg'
            },
            {
                id: 's7',
                name: 'Cardamom Buns',
                description: 'Soft, fluffy buns flavored with aromatic cardamom, cinnamon, and sugar, perfect for a sweet treat.',
                price: 3.99,
                image: '/sides/Cardamom Buns.svg'
            },
            {
                id: 's8',
                name: 'Doughnuts',
                description: 'Freshly baked doughnuts, glazed or sprinkled with sugar, available in a variety of flavors.',
                price: 2.99,
                image: '/sides/Donut.svg'
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
    const [_callDebugMessage, setCallDebugMessage] = useState<UltravoxExperimentalMessageEvent[]>([])
    const [_customerProfileKey, setCustomerProfileKey] = useState<string | null>(null);

    const [isMute, setIsMute] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>("Pizza")
    const conversationRef = useRef<HTMLDivElement>(null)

    const [isMobile, setIsMobile] = useState(false)

    const handleStateChange = useCallback((status: UltravoxSessionStatus | string | undefined) => {
        if (status) {
            setAgentStatus(status)
            console.log(status)
        } else {
            setAgentStatus("")
        }
    }, [])

    const handleCallDebugMessages = useCallback((messages: UltravoxExperimentalMessageEvent) => {
        setCallDebugMessage(prevMsg => [messages, ...prevMsg])
        console.log(messages)
    }, [])

    const clearCustomerProfile = useCallback(() => {
        // This will trigger a re-render of CustomerProfileForm with a new empty profile
        setCustomerProfileKey(prev => prev ? `${prev}-cleared` : 'cleared');
    }, []);

    const handleTranscriptChange = useCallback((transcripts: Transcript[] | undefined) => {
        if (transcripts && transcripts.length > 0) {
            setCallTranscript([...transcripts.reverse()])
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
    useEffect(() => {
        if (isListening)
            handleStartCall()
        else
            handleEndCallButtonClick()
    }, [isListening]);

    useEffect(() => {
        toggleMute(Role.USER)
    }, [isMute])
    useEffect(() => {
        toggleMute(Role.USER)
    }, [isSpeaking]);
    useEffect(() => {
        const handleResize = () =>{
            setIsMobile(window.innerWidth <= 768)
            console.log("Is mobile:" + isMobile)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    return (
        <div className="mt-16 text-white p-6">
            {isMobile ? (<div className="grid grid-cols-1 md:grid-cols-[350px_1fr_350px] gap-6 max-w-7xl mx-auto">
                    {/* Voice Assistant Section */}
                    <Button variant="default" className="bg-primary hover:bg-primary/90" onClick={() => {window.open("https://forms.gle/EEmE88wesyDubc3s6", "_blank")}}>
                        Join Our Waitlist
                    </Button>
                    <VoiceInput isListening={isListening} setListening={setIsListening} isMute={isMute}
                                setMute={setIsMute}
                                isSpeaking={isSpeaking} setSpeaking={setIsSpeaking}
                                agentStatus={agentStatus}
                    />
                    {/* Menu Section */}
                    <Menu menuItems={menuItems} category={selectedCategory} setCategory={setSelectedCategory}/>

                    {/* Current Order Section */}
                    <OrderDetails/>
                </div>
            ) : (<div className="grid grid-cols-1 md:grid-cols-[350px_1fr_350px] gap-6 max-w-7xl mx-auto">
                    {/* Menu Section */}
                    <Menu menuItems={menuItems} category={selectedCategory} setCategory={setSelectedCategory}/>
                    {/* Voice Assistant Section */}
                    <VoiceInput isListening={isListening} setListening={setIsListening} isMute={isMute}
                                setMute={setIsMute}
                                isSpeaking={isSpeaking} setSpeaking={setIsSpeaking}
                                agentStatus={agentStatus}
                    />

                    {/* Current Order Section */}
                    <OrderDetails/>
                </div>
            )}

            {/* Conversation Section */}
            <ChatMessages messages={callTranscript}/>
        </div>
    )
}