import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";

// Types
interface MessageEntry {
  id: string;
  content: string;
  timestamp: string;
}

interface LeadDetail {
  user_id: string;
  email: string | null;
  first_name: string;
  join_date: string;
  last_name: string;
  phone_number: null;
  reffered_date: string;
}

interface SectionState<T> {
    data: T;
    loading: boolean;
    error: string | null;
    sending?: boolean;
    sendError?: string | null;
  }

interface LeadDetailState {
  detail: SectionState<LeadDetail | null>;
  emails: SectionState<MessageEntry[]>;
  sms: SectionState<MessageEntry[]>;
  activity: SectionState<MessageEntry[]>;
  notes: SectionState<MessageEntry[]>;
}

// Helpers
const emptySection = <T>(data: T): SectionState<T> => ({
  data,
  loading: false,
  error: null,
  sending: false,
  sendError: null
});

const initialState: LeadDetailState = {
  detail: emptySection<LeadDetail | null>(null),
  emails: emptySection<MessageEntry[]>([]),
  sms: emptySection<MessageEntry[]>([]),
  activity: emptySection<MessageEntry[]>([]),
  notes: emptySection<MessageEntry[]>([]),
};

// --- Thunks (same as before) ---
export const fetchLeadDetail = createAsyncThunk(
  "leadDetail/fetchDetail",
  async (leadId: string) => {
    
    const res = await MoreClubApiClient.get(`networks/${leadId}/details/`);
    
    return res;
  }
);

// export const fetchEmails = createAsyncThunk("leadDetail/fetchEmails", async (leadId: string) => {
//   const res = await MoreClubApiClient.get(`leads/${leadId}/emails`);
//   return res;
// });

export const sendEmail = createAsyncThunk(
  "leadDetail/sendEmail",
  async ({
    to,
    title,
    body,
  }: {
    to: string[];
    title: string;
    body: string;
  }) => {
    const res = await MoreClubApiClient.post(`networks/send/email/`, {
     recipients:to,
      subject: title,
      message:body,
    });
    return res;
  }
);

// export const fetchSMS = createAsyncThunk("leadDetail/fetchSMS", async (leadId: string) => {
//   const res = await fetch(`/api/leads/${leadId}/sms`);
//   return await res.json();
// });



export const sendSMS = createAsyncThunk(
  "leadDetail/sendSMS",
  async ({ leadId, message }: { leadId: string[]; message: string }) => {
    const res = await MoreClubApiClient.post(`networks/send/sms/`, {
     recipients:leadId,
     message: message,
    });
    return res;
  }
);


// export const fetchActivity = createAsyncThunk("leadDetail/fetchActivity", async (leadId: string) => {
//   const res = await fetch(`/api/leads/${leadId}/activity`);
//   return await res.json();
// });

// export const fetchNotes = createAsyncThunk("leadDetail/fetchNotes", async (leadId: string) => {
//   const res = await fetch(`/api/leads/${leadId}/notes`);
//   return await res.json();
// });

export const addNote = createAsyncThunk(
  "leadDetail/addNote",
  async ({ leadId, content }: { leadId: string; content: string }) => {
    const res = await fetch(`/api/leads/${leadId}/notes`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  }
);

// --- Slice ---
const leadDetailSlice = createSlice({
  name: "leadDetail",
  initialState,
  reducers: {
    clearLeadDetail: () => initialState,
  },
  extraReducers: (builder) => {
    // Detail
    builder
      .addCase(fetchLeadDetail.pending, (state) => {
        state.detail.loading = true;
        state.detail.error = null;
      })
      .addCase(fetchLeadDetail.fulfilled, (state, action) => {
        state.detail.data = action.payload.data.data;
        state.detail.loading = false;
      })
      .addCase(fetchLeadDetail.rejected, (state, action) => {
        state.detail.loading = false;
        state.detail.error = action.error.message || "Error loading detail";
      });

      builder
      // Fetch Emails
    //   .addCase(fetchEmails.pending, (state) => {
    //     state.emails.loading = true;
    //   })
    //   .addCase(fetchEmails.fulfilled, (state, action) => {
    //     state.emails.data = action.payload.data;
    //     state.emails.loading = false;
    //   })
    //   .addCase(fetchEmails.rejected, (state, action) => {
    //     state.emails.loading = false;
    //     state.emails.error = action.error.message || "Email load failed";
    //   })
    
      // Send Email
      .addCase(sendEmail.pending, (state) => {
        state.emails.sending = true;
        state.emails.sendError = null;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.emails.data.unshift(action.payload.data); // assuming res = { data: {...} }
        state.emails.sending = false;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.emails.sending = false;
        state.emails.sendError = action.error.message || "Failed to send email";
      });
    
      

    // SMS
    builder
    //   .addCase(fetchSMS.pending, (state) => {
    //     state.sms.loading = true;
    //   })
    //   .addCase(fetchSMS.fulfilled, (state, action) => {
    //     state.sms.data = action.payload;
    //     state.sms.loading = false;
    //   })
    //   .addCase(fetchSMS.rejected, (state, action) => {
    //     state.sms.loading = false;
    //     state.sms.error = action.error.message || "SMS load failed";
    //   })
      .addCase(sendSMS.pending, (state) => {
        state.sms.sending = true;
        state.sms.sendError = null;
      })
      .addCase(sendSMS.fulfilled, (state, action) => {
        state.sms.data.unshift(action.payload.data);
        state.sms.sending = false;
      })
      .addCase(sendSMS.rejected, (state, action) => {
        state.sms.sending = false;
        state.sms.sendError = action.error.message || "Failed to send SMS";
      });
      

    // Activity
    // builder
    //   .addCase(fetchActivity.pending, (state) => {
    //     state.activity.loading = true;
    //   })
    //   .addCase(fetchActivity.fulfilled, (state, action) => {
    //     state.activity.data = action.payload;
    //     state.activity.loading = false;
    //   })
    //   .addCase(fetchActivity.rejected, (state, action) => {
    //     state.activity.loading = false;
    //     state.activity.error = action.error.message || "Activity load failed";
    //   });

    // Notes
    // builder
    //   .addCase(fetchNotes.pending, (state) => {
    //     state.notes.loading = true;
    //   })
    //   .addCase(fetchNotes.fulfilled, (state, action) => {
    //     state.notes.data = action.payload;
    //     state.notes.loading = false;
    //   })
    //   .addCase(fetchNotes.rejected, (state, action) => {
    //     state.notes.loading = false;
    //     state.notes.error = action.error.message || "Notes load failed";
    //   })
    //   .addCase(addNote.fulfilled, (state, action) => {
    //     state.notes.data.unshift(action.payload);
    //   });
  },
});

export const { clearLeadDetail } = leadDetailSlice.actions;
export const selectLeadDetailState = (state: RootState) => state.leadDetail;
export default leadDetailSlice.reducer;
