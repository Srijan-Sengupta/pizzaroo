import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function OrderDetails(){
    return (
        <Card className="bg-[#1A1D24]/50 backdrop-blur-md p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Current Order</h2>

            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold">Large Pepperoni Pizza</h3>
                        <p className="text-sm text-gray-400">Extra cheese, crispy crust</p>
                    </div>
                    <span className="text-primary">$18.99</span>
                </div>

                <div className="flex justify-between items-center">
                    <span>Garlic Bread</span>
                    <span className="text-primary">$1.00</span>
                </div>

                <Button variant="secondary" className="w-full bg-[#2A2D35] hover:bg-[#2A2D35]/80 justify-between">
                    <span>Add 2 Coke bottles</span>
                    <span className="text-primary">$3.99</span>
                </Button>

                <Button variant="secondary" className="w-full bg-[#2A2D35] hover:bg-[#2A2D35]/80 justify-between">
                    <span>Add dessert</span>
                    <span className="text-primary">$4.99</span>
                </Button>

                <div className="border-t border-gray-800 mt-6 pt-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Subtotal</span>
                        <span className="text-primary">$19.00</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-primary">$19.00</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}