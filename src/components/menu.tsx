import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import {Dispatch} from "react";

export interface Item {
    id: string
    name: string
    description?: string
    price: number
    image: string
}

export interface MenuItem {
    category_name: string
    category_avatar: string
    description?: string
    items: Item[]
}

export function Menu(props: {
    menuItems: MenuItem[];
    category: string;
    setCategory: Dispatch<string>;
}) {
    Object.values(props.menuItems.map(item => {
        item.category_name
    }));
    return (
        <Card className="bg-[#1A1D24]/50 backdrop-blur-md p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Menu</h2>

            <div className="flex gap-3 mb-6">
                {props.menuItems.map(item => (
                    <Button key={item.category_name} variant="secondary" className="bg-[#2A2D35] hover:bg-[#2A2D35]/80"
                            onClick={() => {
                                props.setCategory(item.category_name)
                            }}>
                        <Image src={item.category_avatar} alt={item.category_name} height={16} width={16}/>
                        {item.category_name}
                    </Button>
                ))}
            </div>

            <div className="grid gap-4">
                {props.menuItems.filter((item) => item.category_name == props.category).map((item) => item.items).flat().map((item) => (
                    <div key={item.id} className="relative group bg-[#1E2128] rounded-xl p-4 flex gap-4">
                        <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-400 mt-1">${item.price}</p>
                        </div>
                        <Button size="icon"
                                className="absolute bottom-4 right-4 bg-primary hover:bg-primary/90 rounded-full">
                            <Plus className="w-4 h-4"/>
                        </Button>
                    </div>
                ))}
            </div>
        </Card>
    )
}