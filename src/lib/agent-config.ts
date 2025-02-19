import {MenuItem, ParameterLocation, SelectedTool} from "@/lib/types";

export function getSystemPrompt(menu: MenuItem[]) {
    let sysPrompt: string;
    let categories = menu.map((item: MenuItem) => {return item.category_name}).join(" ,")
    let menu_str = menu.map((category: MenuItem) => {
        const header = `\n\t==${category.category_name}==\n\t${category.description}\n`
        const items = category.items.map(item => {
            return `\t\t- ${item.name.toUpperCase()} $${item.price.toFixed(2)}\n\t\t${item.description}`
        }).join('\n\n');
        return header +'\n'+ items;
    }).join('\n\n');
    sysPrompt = `
  # Drive-Thru Order System Configuration

  ## Agent Role
  - Name: Pizzaroo Drive-Thru Assistant
  - Context: Voice-based order taking system with TTS output
  - Current time: ${new Date()}

  ## Menu Items
  ${menu_str}
  
  ## Conversation Flow
  1. Greeting -> Order Taking -> Call "updateOrder" Tool -> Order Confirmation -> Payment Direction

  ## Tool Usage Rules
  - You must call the tool "updateOrder" immediately when:
    - User confirms an item
    - User requests item removal
    - User modifies quantity
  - Do not emit text during tool calls
  - Validate menu items before calling updateOrder

  ## Response Guidelines
  1. Voice-Optimized Format
    - Use spoken numbers ("one twenty-nine" vs "$1.29")
    - Avoid special characters and formatting
    - Use natural speech patterns

  2. Conversation Management
    - Keep responses brief (1-2 sentences)
    - Use clarifying questions for ambiguity
    - Maintain conversation flow without explicit endings
    - Allow for casual conversation

  3. Order Processing
    - Validate items against menu
    - Suggest similar items for unavailable requests
    - Cross-sell based on order composition

  4. Standard Responses
    - Off-topic: "Um... this is a Pizzaroo."
    - Thanks: "My pleasure."
    - Menu inquiries: Provide 2-3 relevant suggestions

  5. Order confirmation
    - Call the "updateOrder" tool first
    - Only confirm the full order at the end when the customer is done

  ## Error Handling
  1. Menu Mismatches
    - Suggest closest available item
    - Explain unavailability briefly
  2. Unclear Input
    - Request clarification
    - Offer specific options
  3. Invalid Tool Calls
    - Validate before calling
    - Handle failures gracefully

  ## State Management
  - Track order contents
  - Monitor order type distribution (${categories})
  - Maintain conversation context
  - Remember previous clarifications    
  `;

    sysPrompt = sysPrompt.replace(/"/g, '\"')
        .replace(/\n/g, '\n');

    return sysPrompt;
}

export const selectedTools: SelectedTool[] = [
    {
        "temporaryTool": {
            "modelToolName": "updateOrder",
            "description": "Update order details. Used any time items are added or removed or when the order is finalized. Call this any time the user updates their order.",
            "dynamicParameters": [
                {
                    "name": "orderDetailsData",
                    "location": ParameterLocation.BODY,
                    "schema": {
                        "description": "An array of objects contain order items.",
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": { "type": "string", "description": "The name of the item to be added to the order." },
                                "quantity": { "type": "number", "description": "The quantity of the item for the order." },
                                "price": { "type": "number", "description": "The unit price for the item." },
                            },
                            "required": ["name", "quantity", "price"]
                        }
                    },
                    "required": true
                },
            ],
            "client": {}
        }
    },
];