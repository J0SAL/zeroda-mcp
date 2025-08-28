# Zeroda MCP

A demo server that exposes trading and utility tools via the Model Context Protocol (MCP), integrating with Zerodha's Kite Connect API.

## Features

- Addition tool for simple math (for testing the mcp)
- Get Zerodha user profile
- Place buy/sell stock orders (real orders, use with caution!)

## Project Structure

```
.env
.gitignore
index.ts
package.json
trade.ts
tsconfig.json
```

## Setup

1. **Clone the repository**

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root with the following variables:

   ```
   KITE_API_KEY=your_kite_api_key
   KITE_API_SECRET=your_kite_api_secret
   KITE_REQUEST_TOKEN=your_request_token
   KITE_ACCESS_TOKEN=your_access_token
   ```

   > See [trade.ts](trade.ts) for how these are used.

4. **Run the server**

   ```sh
   npx tsx index.ts
   ```
   or
   ```sh
   npx ts-node index.ts
   ```

## Main Files

- [`index.ts`](index.ts): MCP server setup and tool registration.
- [`trade.ts`](trade.ts): Zerodha Kite Connect integration and trading logic.

## Notes

- The buy/sell endpoints are set up to place real orders. Uncomment the relevant lines in [`index.ts`](index.ts) to enable actual trading.
- Make sure your `.env` is correct and your API credentials are