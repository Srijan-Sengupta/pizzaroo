import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import {Dispatch} from "react";
import {MenuItem} from "@/lib/types";

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

            <div className="grid gap-4 overflow-auto sm:h-[20vh] md:h-[20vh] lg:h-[70vh] [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                {props.menuItems.filter((item) => item.category_name == props.category).map((item) => item.items).flat().map((item) => (
                    <div key={item.id} className="relative group bg-[#1E2128] rounded-xl p-4 flex gap-4">
                        <Image
                            src={item.image || "/file.svg"}
                            alt={item.name}
                            with={24}
                            height={24}
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