"use client";

import axios, { AxiosInstance } from "axios";
import cookie from "cookie";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";
import { platformUrls } from "../utils";

const getClientApiUrl = (platform: string): string => {
  const urls = platformUrls[platform];
  if (!urls) {
    return "https://moretrek.com/api/";
  }
  let countryCode = "SE"; // Default country code
  if (typeof document !== "undefined") {
    const cookies = document.cookie;
    const parsedCookies = cookie.parse(cookies);
    countryCode = parsedCookies.countryCode || "default";
  }
  return urls[countryCode] || urls["default"];
};

const createAxiosInstance = (platform: string, includeCountryCode: boolean): AxiosInstance => {
  const baseURL = getClientApiUrl(platform);

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (includeCountryCode) {
    instance.interceptors.request.use(
      (config) => {
        const cookies = document.cookie;
        const parsedCookies = cookie.parse(cookies);
        const countryCode = parsedCookies.countryCode || "SE";
        if (countryCode) {
          config.headers["x-country-code"] = countryCode;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  return instance;
};

export const useAxiosAuthClient = (platform: string, includeCountryCode: boolean): AxiosInstance => {
  const { data: session, status } = useSession();

  // Memoize the axios instance so it isn't recreated on every render.
  const axiosInstance = useMemo(
    () => createAxiosInstance(platform, includeCountryCode),
    [platform, includeCountryCode]
  );

  useEffect(() => {
    async function setAuthorizationHeader() {
      // If the session is still loading, attempt to retrieve it manually.
      let sessionData = session;
      if (status === "loading") {
        sessionData = await getSession();
      }
      if (sessionData?.accessToken) {
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${sessionData.accessToken}`;
      }
    }
    setAuthorizationHeader();
  }, [session, status, axiosInstance]);

  return axiosInstance;
};
