"use client";

import React, { useState } from "react";
import { SendHorizonal, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendEmail } from "@/lib/redux/slice/moreclub/network";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { showToast } from "@/lib/utilities/toastService";

const EmailForm = ({ to }: { to: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { sending, sendError } = useSelector(
    (state: RootState) => state.leadDetail.emails
  );

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [subjectError, setSubjectError] = useState<string | null>(null);
  const [bodyError, setBodyError] = useState<string | null>(null);

  const handleSend = async () => {
    setSubjectError(null);
    setBodyError(null);

    let hasError = false;
    if (!subject.trim()) {
      setSubjectError("Subject is required");
      hasError = true;
    } else if (subject.length < 5) {
      setSubjectError("Subject must be at least 5 characters");
      hasError = true;
    }

    if (!body.trim()) {
      setBodyError("Body is required");
      hasError = true;
    } else if (body.length < 10) {
      setBodyError("Body must be at least 10 characters");
      hasError = true;
    }

    if (hasError) return;

    try {
      await dispatch(sendEmail({ to: [to], title: subject, body })).unwrap();
      showToast("Email sent successfully", "success");
      setSubject("");
      setBody("");
    } catch (error: any) {
      showToast(error.message || "Failed to send email", "error");
    }
  };

  return (
    <div className="space-y-4">
      {sendError && (
        <p className="text-sm text-red-500 font-medium">{sendError}</p>
      )}

      <div>
        <Input
          placeholder="Email Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={sending}
        />
        {subjectError && (
          <p className="text-xs text-red-500 mt-1">{subjectError}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Email Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={sending}
          className="w-full border rounded-md p-2 min-h-[120px]"
        />
        {bodyError && (
          <p className="text-xs text-red-500 mt-1">{bodyError}</p>
        )}
      </div>

      <Button
        onClick={handleSend}
        disabled={sending || !subject || !body}
        className="flex items-center gap-2"
      >
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

export default EmailForm;
