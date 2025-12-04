// app/api/subscribe/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const response = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/customers.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_API_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        customer: {
          email,
          accepts_marketing: true,
        },
      }),
    });

    const data = await response.json();
    console.log("🔹 Shopify response:", data);
    if (response.ok) {
      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json({ success: false, error: data.errors }, { status: 400 });
    }
  } catch (err) {
    console.error("🔥 Error:", err.message); 
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
