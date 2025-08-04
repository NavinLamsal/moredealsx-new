"use client";
import React, { useState } from "react";
import { SendHorizonal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { sendSMS } from "@/lib/redux/slice/moreclub/network";
import { showToast } from "@/lib/utilities/toastService";



const SMSForm = ({ to }: { to: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { sending, sendError } = useSelector((state: RootState) => state.leadDetail.sms);

  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState<string | null>(null);

  const handleSend = async () => {
    setMessageError(null);

    if (!message.trim()) {
      setMessageError("Message is required");
      return;
    }

    if (message.length < 5) {
      setMessageError("Message must be at least 5 characters");
      return;
    }

    try {
      await dispatch(sendSMS({ leadId: [to], message })).unwrap();
      showToast("SMS sent successfully", "success");
      // setMessage("");
    } catch (error: any) {
      showToast(error.message || "Failed to send SMS", "error");
    }
  };

  return (
    <div className="w-full space-y-2">
      {sendError && <p className="text-sm text-red-500 font-medium">{sendError}</p>}

      <textarea
        placeholder="Type SMS..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={sending}
        className="w-full border p-2 rounded-md min-h-[80px]"
      />
      {messageError && <p className="text-xs text-red-500 mt-1">{messageError}</p>}

      <Button onClick={handleSend} disabled={!message || sending} className="flex items-center gap-2">
        {sending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <SendHorizonal className="w-4 h-4" />
            Send
          </>
        )}
      </Button>
    </div>
  );
};

export default SMSForm;
