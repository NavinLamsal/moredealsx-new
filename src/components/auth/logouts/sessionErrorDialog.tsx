"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { resetSessionErrorDialog } from "@/lib/redux/slice/moreclub/authStore";
import { signOut } from "next-auth/react";


const SessionErrorDialog = () => {
  const dispatch = useAppDispatch();
  const { sessionError, showSessionErrorDialog } = useAppSelector(
    (state) => state.auth
  );

  if (!showSessionErrorDialog) return null;

  const handleConfirm = async () => {
    dispatch(resetSessionErrorDialog()); // ✅ properly reset dialog state
    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Session Error</h2>
        <p className="mb-4">{sessionError}</p>
        <button
          onClick={handleConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SessionErrorDialog;
