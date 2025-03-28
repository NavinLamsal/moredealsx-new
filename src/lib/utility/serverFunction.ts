"use server"





export const getMorefoodServerurl = async(countryCode?: string): Promise<string> => {
    const platformUrls: Record<string, Record<string, string>> = {
        moredealsclub: {
          default: process.env.NEXT_PUBLIC_BASE_URL ?? "https://moretrek.com/api/",  // Default for morclub
        },
        morefood: {
          SE: process.env.NEXT_PUBLIC_MOREFOOD_BASE_URL_SE ?? "https://api.morefood.se/api/",
          NP: process.env.NEXT_PUBLIC_MOREFOOD_BASE_URL_NP ?? "https://api.nepalbites.com/api/",
          default: process.env.NEXT_PUBLIC_MOREFOOD_BASE_URL_SE ?? "https://api.morefood.se/api/", // Default for morefood
        },
        moreSalon: {
          default: "https://api.moresalons.com/api/", // Default for moresaloon
        },
        moreliving: {
          default: "https://api.morelivingglobal.com/api", // Default for moresaloon
        },
      };
      
    const urls = platformUrls["morefood"];
  if (countryCode && urls[countryCode]) {
    return urls[countryCode];
  }
  return urls["default"] || "https://api.morefood.se/api/";
}
