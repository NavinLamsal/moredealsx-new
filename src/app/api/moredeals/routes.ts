
import MoreFoodApiClient from "@/lib/axios/morefood/MoreFoodApiClient";
import { getMorefoodServerurl, getServerApiUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const formattedData = await request.json();

  console.log("formattedData", formattedData);
  const baseURL = getMorefoodServerurl(formattedData.country_code);
  console.log("baseURL", baseURL);
  
  try {
    const response = await MoreFoodApiClient.post(
      `${baseURL}orders/order/`,
      formattedData.formattedData,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Country-Code": formattedData.country_code,
        },
      }
    );

    return NextResponse.json(
      {
        success: false,
        data: response.data,
      },
      { status: response.status }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        data: error.response.data,
      },
      { status: error.response.status }
    );
  }
}
