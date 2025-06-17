"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";

const COOKIE_CONSENT_KEY = "cookie_consent"; // accepted / declined
const COOKIE_HIDE_FOREVER = "cookie_hide_forever"; // true

export default function CookieConsentBanner() {
  const pathname = usePathname();

  const [showBanner, setShowBanner] = useState(false);
  const [showMini, setShowMini] = useState(false);
  const [hideForever, setHideForever] = useState(false);
  const [consentStatus, setConsentStatus] = useState<"accepted" | "declined" | null>(null);

  const localKeys = useMemo(() => [
    "token", "business_setup", "membership", "forget_username",
    "forget_code", "otp_username",
  ], []);

  const sessionKeys = useMemo(() => [
    "bpms", "registrationData", "BusinessRegistrationData", "pin_via",
    "orderStep", "deliverytype", "receiverName", "mobileNumber",
    "receiverEmail", "note", "arrivalTime", "no_of_people", "location",
    "lat", "lon", "country", "city",
  ], []);

  useEffect(() => {
    const hide = localStorage.getItem(COOKIE_HIDE_FOREVER) === "true";
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);

    setHideForever(hide);
    setConsentStatus(consent === "accepted" || consent === "declined" ? consent : null);

    if (hide) {
      // Hide everything forever
      setShowBanner(false);
      setShowMini(false);
      return;
    }

    if (consent === "accepted") {
      setShowBanner(false);
      setShowMini(true);
    } else if (consent === "declined") {
      // Show banner again on route changes after decline
      setShowMini(false);
      setShowBanner(true);
    } else {
      // No consent yet, show big banner only
      setShowBanner(true);
      setShowMini(false);
    }
  }, [pathname]);

  const acceptCookies = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    localStorage.removeItem(COOKIE_HIDE_FOREVER);
    setConsentStatus("accepted");
    setShowBanner(false);
    setShowMini(true);
    setHideForever(false);
  }, []);

  const declineCookies = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");

    localKeys.forEach((key) => localStorage.removeItem(key));
    sessionKeys.forEach((key) => sessionStorage.removeItem(key));

    localStorage.removeItem(COOKIE_HIDE_FOREVER);
    setConsentStatus("declined");
    setShowBanner(false);
    setShowMini(true); 
    setHideForever(false);
  }, [localKeys, sessionKeys]);

  const hidePermanently = useCallback(() => {
    if (consentStatus !== "accepted") return; // Only allow if accepted

    localStorage.setItem(COOKIE_HIDE_FOREVER, "true");
    setHideForever(true);
    setShowBanner(false);
    setShowMini(false);
  }, [consentStatus]);

  const reopenBanner = useCallback(() => {
    setShowBanner(true);
    setShowMini(false); 
  }, []);

  return (
    <>
      {showBanner && (
        <div className="fixed sm:bottom-6 bottom-3 sm:right-6 right-3 z-50 w-[90%] max-w-lg bg-white p-6 rounded-2xl shadow-xl border">
          <div className="flex items-start gap-4">
            <div>
              <h2 className="sm:text-lg text-base font-semibold text-gray-900">
                How We Use Cookies and Local Storage
              </h2>
              <p className="sm:text-sm text-xs text-gray-600 mt-1">
                We use cookies and local storage to improve your experience.
                This includes saving login and membership information, order
                progress, and location data. Learn more in our{" "}
                <Link href="/cookie-policy" className="text-green-600 underline">
                  cookie policy
                </Link>.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={acceptCookies}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg sm:text-sm text-xs hover:bg-black transition"
                >
                  Accept All
                </button>
                <button
                  onClick={declineCookies}
                  className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg sm:text-sm text-xs hover:bg-gray-200 transition"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMini && !hideForever && consentStatus === "accepted" && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
          <button
            onClick={reopenBanner}
            className="text-xs bg-gray-800 text-white px-3 py-1 rounded-full shadow hover:bg-black transition"
          >
            Change Cookie Settings
          </button>
          <button
            onClick={hidePermanently}
            className="text-[10px] text-gray-400 hover:text-gray-600 underline"
          >
            Don't show again
          </button>
        </div>
      )}

      {showMini && !hideForever && consentStatus === "declined" && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={reopenBanner}
            className="text-xs bg-gray-800 text-white px-3 py-1 rounded-full shadow hover:bg-black transition"
          >
            Change Cookie Settings
          </button>
        </div>
      )}
    </>
  );
}
