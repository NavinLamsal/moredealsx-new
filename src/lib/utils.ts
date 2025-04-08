import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { RootState } from "./redux/store";
import cookie from "cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type DeviceType = 'Mobile' | 'Tablet' | 'Desktop' | 'Unknown';
type BrowserType = 'Chrome' | 'Firefox' | 'Safari' | 'Edge' | 'Dart' | 'Unknown';

export const parseUserAgent = (userAgent: string): { deviceType: DeviceType, browser: BrowserType } => {
  const mobileRegex = /mobile/i;
  const tabletRegex = /tablet/i;
  const androidRegex = /android/i;
  const iosRegex = /iphone|ipod|ipad/i;
  const chromeRegex = /chrome/i;
  const firefoxRegex = /firefox/i;
  const safariRegex = /safari/i;
  const edgeRegex = /edge/i;
  const dartRegex = /dart/i;  // Regex for detecting Dart applications

  let deviceType: DeviceType = 'Desktop'; // Default to desktop

  // If Dart is detected, classify it as mobile
  if (dartRegex.test(userAgent)) {
    return { deviceType: 'Mobile', browser: 'Dart' }; // Dart is now classified as mobile
  }

  // Check for mobile and tablet devices
  if (mobileRegex.test(userAgent)) {
    deviceType = 'Mobile';
  } else if (tabletRegex.test(userAgent)) {
    deviceType = 'Tablet';
  }

  // Browser detection
  let browser: BrowserType = 'Unknown';

  if (chromeRegex.test(userAgent)) {
    browser = 'Chrome';
  } else if (firefoxRegex.test(userAgent)) {
    browser = 'Firefox';
  } else if (safariRegex.test(userAgent)) {
    browser = 'Safari';
  } else if (edgeRegex.test(userAgent)) {
    browser = 'Edge';
  }

  return { deviceType, browser };
};




export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!user || !domain) return "";

  const visiblePart = user.charAt(0);
  const maskedPart = "*".repeat(Math.max(user.length - 1, 1));

  return `${visiblePart}${maskedPart}@${domain}`;
}

export const removePrefix = (phoneNumber: string, prefix: string) =>{
  return  phoneNumber.startsWith(prefix) ? phoneNumber.slice(prefix.length) : phoneNumber;
}


// export const removeEmptyStrings = (obj: any): any => {
//   if (Array.isArray(obj)) {
//     return obj.map(removeEmptyStrings);
//   } else if (typeof obj === "object" && obj !== null) {
//     return Object.fromEntries(
//       Object.entries(obj)
//         .filter(([_, value]) => value !== "") // Remove empty string values
//         .map(([key, value]) => [key, removeEmptyStrings(value)]) // Recurse into objects/arrays
//     );
//   }
//   return obj;
// };


export function getTimeOfDay() {
  const hours = new Date().getHours();
  if (hours >= 5 && hours < 12) return "Morning";
  if (hours >= 12 && hours < 17) return "Afternoon";
  if (hours >= 17 && hours < 21) return "Evening";
  return "Night";
}


export const getCurrencySymbolKey = (type: string) => {
  const normalizedType = type.trim().toUpperCase();

  switch (normalizedType) {
    case "RECEIVE":
    case "LOAD":
      return "currency_received_symbol";
    case "SEND":
    case "WITHDRAW":
    case "BOOK":
      return "currency_sent_symbol";
    default:
      return "currency_sent_symbol";
  }
};



export const getTransactionAmountKey = (type: string) => {
  const normalizedType = type.trim().toUpperCase();

  switch (normalizedType) {
    case "RECEIVE":
    case "LOAD":
      return "currency_received_amount";
    case "SEND":
    case "WITHDRAW":
    case "BOOK":
      return "currency_sent_amount";
    default:
      return "currency_sent_amount";
  }
};

export const removeEmptyStrings = (obj: any): any => {
  if (obj instanceof File || obj instanceof Blob) {
    return obj; // Keep File and Blob objects intact
  }

  if (Array.isArray(obj)) {
    return obj
      .map(removeEmptyStrings) // Recursively clean each item in the array
      .filter(item => item !== "" && item !== null && item !== undefined); // Remove empty strings, null, and undefined but keep valid files
  } 
  
  if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, value]) => value !== "" && value !== null && value !== undefined) // Remove empty values
        .map(([key, value]) => [key, removeEmptyStrings(value)]) // Recurse into objects
    );
  }

  return obj;
};



export const fetchLiveLocation = async () => {
  try {

    const res = await axios.get(
      `https://pro.ip-api.com/json/?key=F6UL4cER6af4oPb`
    );
      if (typeof window !== "undefined") { 
          const countryCode = res.data.countryCode;
          const now = new Date();
          now.setTime(now.getTime() + 20 * 60 * 1000); // Add days in milliseconds
          const expires = "expires=" + now.toUTCString();
          document.cookie = `countryCode=${countryCode}; path=/; ${expires}`; 
      }
    return res.data;
  } catch (error:any) {
    console.error("Error in Live Location", error);
    return error.res.data;
  }
};


export const getCountryCode = async () => {
  let countrycode = "";
  if (typeof window !== "undefined") {
    const cookies = document.cookie;
    const parsedCookies = cookie.parse(cookies);
    const countryCode = parsedCookies.countryCode;

    if (countryCode) {
      countrycode = countryCode;
    } else {
      const countryData = await fetchLiveLocation();
      countrycode = countryData.countryCode;
    }
  }
  return countrycode;
};



const apiUrlMapping: Record<string, string> = {
  "morefood.se": process.env.NEXT_PUBLIC_BASEURL ?? 'https://api.morefood.se/api/',
  "nepalbites.com": process.env.NEXT_PUBLIC_BASEURL_NEPAL ?? 'https://api.nepalbites.com/api/',
  "localhost:3000": process.env.NEXT_PUBLIC_BASEURL_NEPAL ?? 'https://api.nepalbites.com/api/'
};

export const getApiUrl = (): string => {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_BASEURL ?? 'https://api.morefood.se/api/'
  }

 
  // Get the current host from the browser
  const currentHost = window.location.host.replace(/^(www\.)/, ""); // Remove "www." if present

  // Get the API URL for the current host
  const apiUrl = apiUrlMapping[currentHost];

  if (!apiUrl) {
    return process.env.NEXT_PUBLIC_BASEURL ?? 'https://api.morefood.se/api/'
  }

  return apiUrl;
};








export const platformUrls: Record<string, Record<string, string>> = {
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

export const getServerApiUrl = (platform: string, countryCode?: string): string => {
  const urls = platformUrls[platform];

  // If no platform-specific URLs are found, return the global fallback URL
  if (!urls) {
    return "https://moretrek.com/api/";
  }

  // If a country-specific URL is available and valid, return it
  if (countryCode && urls[countryCode]) {
    return urls[countryCode];
  }

  // If no valid country-specific URL is found, return the platform's default URL
  return urls["default"] || "https://moretrek.com/api/";
};


export const getMorefoodServerurl = (countryCode?: string): string => {
  const urls = platformUrls["morefood"];
  if (countryCode && urls[countryCode]) {
    return urls[countryCode];
  }
  return urls["default"] || "https://api.morefood.se/api/";
}




// Currency conversion utility function
export const currencyConvertor = (fromCurrency: string, toCurrency: string, state: RootState) => {
    const rates = state.currency.conversionRates;

    if (rates[fromCurrency] && rates[toCurrency]) {
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        return toRate / fromRate;
    }

    console.warn("Conversion rates not available for the selected currencies.");
    return null;
};

