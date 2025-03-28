
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { getMorefoodServerurl } from "@/lib/utility/serverFunction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const formattedData = await request.json();

  const baseURL =await getMorefoodServerurl(formattedData.country_code);
  console.log("baseurl", baseURL);
  console.log("formattedData", formattedData)
  try {
    const response = await MoreClubApiClient.post(
      `${baseURL}orders/create/`,
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
    console.log("response", error?.response)

    return NextResponse.json(
      {
        success: false,
        data: error.response.data,
      },
      { status: error.response.status }
    );
  }
}
