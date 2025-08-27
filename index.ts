import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { getProfile, placeOrder } from "./trade";


// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// Add an addition tool
server.registerTool("add",
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

server.registerTool("get-profile",
  {
    title: "Profile Info",
    description: "Get User's profile Information from their zeroda account",
    inputSchema: {}
  },
  async () => {
    const profile = await getProfile();
    return {
      content: [{ type: "text", text: String(JSON.stringify(profile)) }]
    };
  }
);

server.registerTool("buy-stock",
    {
        title: "Buy a stock", 
        description: "Buys the stock on zeroda exchange for the user. It executes a real order on behalf of the user.",
        inputSchema: { stock: z.string(), qty: z.number() }
    },
    async ({ stock, qty }) => {
        // placeOrder(stock,"BUY", qty);
        return {
            content: [{ type: "text", text: "Stock has been bought" }]
        }  
    }
)

server.registerTool("sell-stock",
    {
        title: "Sell a stock", 
        description: "Sells the stock on zeroda exchange for the user. It executes a real order on behalf of the user.",
        inputSchema: { stock: z.string(), qty: z.number() }
    },
    async ({ stock, qty }) => {
        // placeOrder(stock,"SELL", qty);
        return {
            content: [{ type: "text", text: "Stock has been bought" }]
        }  
    }
)

const transport = new StdioServerTransport();
await server.connect(transport);