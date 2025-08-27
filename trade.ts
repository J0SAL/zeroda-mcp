import { KiteConnect } from "kiteconnect";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file in project root
dotenv.config({ path: join(__dirname, '.env') });

const apiKey = process.env.KITE_API_KEY as string;
const apiSecret = process.env.KITE_API_SECRET as string;
const requestToken = process.env.KITE_REQUEST_TOKEN as string;
const access_token = process.env.KITE_ACCESS_TOKEN as string;

const kc = new KiteConnect({ api_key: apiKey });
kc.setAccessToken(access_token);
// console.log(kc.getLoginURL()); // Use this URL to get the request token

async function init() {
  try {
    // await generateSession(); - only needed once to generate access token
    
    await getProfile();
  } catch (err) {
    console.error(err);
  }
}

async function generateSession() {
  try {
    const response = await kc.generateSession(requestToken, apiSecret);
    console.log("Access Token:", response.access_token);    
    console.log("Session generated:", response);
  } catch (err) {
    console.error("Error generating session:", err);
  }
}

export async function getProfile() {
  try {
    const profile = await kc.getProfile();
    console.log("Profile:", profile);
    return profile;
  } catch (err: any) {
    return { error: err.message || "Failed to get profile" };
  }
}

export async function placeOrder(tradingsymbol: string, transaction_type: "BUY" | "SELL", quantity: number) {
    try {
        const orderid = await kc.placeOrder("regular", {
            exchange: "NSE",
            tradingsymbol,
            transaction_type,
            quantity,
            order_type: "MARKET",
            product: "CNC"
        });
        console.log("Order placed. ID:", orderid);
    } catch (err) {
        console.error("Error placing order:", err);
    }
}
