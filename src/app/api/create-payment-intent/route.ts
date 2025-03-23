import { getServerApiUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    
    const { totalAmount, metadata } = await request.json();

    // const baseURL = getServerApiUrl(request.url);

    const data = await fetch(
      `https://moretrek.com/api/payments/stripe/create-payment-intent/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify({
          items: [
            {
              metadata
            },
          ],
        }),
      }
    ).then(async (res) => {

      return res.json();
    });
      

    const resdata = {
      clientSecret: data.clientSecret,
      paymentIntent: data.payment_intent,
    };
    if (data.error !== undefined) {
      throw new Error(data.error);
    }

    return NextResponse.json({ data: resdata });
    // return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
 
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: `Internal Server Error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
