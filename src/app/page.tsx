"use client"

import {useState} from "react"
import {Card} from "@/components/ui/card"
import VoiceInput from "@/components/voice-input";
import OrderDetails from "@/components/orders";
import {Menu, MenuItem} from "@/components/menu";

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
    const [isListening, setIsListening] = useState(false)
    const [isMute, setIsMute] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>("Pizza")

    return (
        <div className="mt-16 text-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-[350px_1fr_350px] gap-6 max-w-7xl mx-auto">
                {/* Menu Section */}
                <Menu menuItems={menuItems} category={selectedCategory} setCategory={setSelectedCategory}/>
                {/* Voice Assistant Section */}
                <VoiceInput isListening={isListening} setListening={setIsListening} isMute={isMute} setMute={setIsMute}
                            isSpeaking={isSpeaking} setSpeaking={setIsSpeaking}/>

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