'use client'

import {Card} from "@/components/ui/card";
import {OrderDetailsData, OrderItem} from "@/lib/types";
import {useEffect, useState} from "react";

function prepOrderDetails(orderDetailsData: string): OrderDetailsData {
    try {
        console.log("Received JSON: " + orderDetailsData);
        const parsedItems: OrderItem[] = JSON.parse(orderDetailsData);
        const totalAmount = parsedItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        // Construct the final order details object with total amount
        return {
            items: parsedItems,
            totalAmount: Number(totalAmount.toFixed(2))
        };
    } catch (error) {
        throw new Error(`Failed to parse order details: ${error}`);
    }
}

export default function OrderDetails() {

    const [orderDetails, setOrderDetails] = useState<OrderDetailsData>({
        items: [],
        totalAmount: 0,
    })

    useEffect(() => {
        const handleOrderUpdate = (event: CustomEvent<string>) => {
            const formattedData = prepOrderDetails(event.detail)
            setOrderDetails(formattedData)
        }

        window.addEventListener('orderDetailsUpdated', handleOrderUpdate as EventListener);
        return () => {
            window.removeEventListener('orderDetailsUpdated', handleOrderUpdate as EventListener);
        }
    }, [])

    const formatCurrency = (amount: number) => {
        return Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    }

    return (
        <Card className="bg-[#1A1D24]/50 backdrop-blur-md p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">Current Order</h2>

            <div className="space-y-4">
                {orderDetails.items.length > 0 ? (
                    orderDetails.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold">{" x" + item.quantity + " " + item.name}</h3>
                                <p className="text-sm text-gray-400">{item.specialInstructions}</p>
                            </div>
                            <span className="text-primary">{item.price}</span>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-between items-center">
                        <span>No Items Added</span>
                    </div>
                )}

                <div className="border-t border-gray-800 mt-6 pt-4">
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-primary">{formatCurrency(orderDetails.totalAmount)}</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}