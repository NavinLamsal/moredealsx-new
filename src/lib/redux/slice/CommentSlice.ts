import { fetchCommentsApi, postCommentApi, postReplyApi } from "@/lib/action/moreClub/Comment";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define Comment & Reply Types
export interface Reply {
  id: number;
  user: string;
  body: string;
  created: string;
}

export interface Comment {
  id: number;
  user: string;
  body: string;
  created: string;
  replies: Reply[];
}

// ✅ Define the Redux State Type
interface CommentsState {
  [postId: string]: Comment[]; // postId is now a string
}

// ✅ Initial State
const initialState: CommentsState = {};

// ✅ Thunk to fetch comments for a specific post
export const fetchComments = createAsyncThunk<
  { postId: string; comments: Comment[] },
  string, // Changed postId type to string
  { rejectValue: string }
>("comments/fetchComments", async (postId, { rejectWithValue }) => {
  try {
    const comments = await fetchCommentsApi(postId);
    return { postId, comments };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ✅ Thunk to add a new comment to the post
export const addComment = createAsyncThunk<
  { postId: string; newComment: Comment }, // postId is now a string
  { postId: string; body: string }, // postId is now a string
  { rejectValue: string }
>("comments/addComment", async ({ postId, body }, { rejectWithValue }) => {
  try {
    const newComment = await postCommentApi(postId, body);
    return { postId, newComment }; // Changed to use postId as string
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ✅ Thunk to add a reply to a specific comment
export const addReply = createAsyncThunk<
  { postId: string; commentId: number; reply: Reply }, // postId is now a string
  { postId: string; commentId: number; reply: string }, // postId is now a string
  { rejectValue: string }
>("comments/addReply", async ({ postId, commentId, reply }, { rejectWithValue }) => {
  try {
    const newReply = await postReplyApi(postId, commentId, reply);
    return { postId, commentId, reply: newReply }; // Changed to use postId as string
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ✅ Comments Slice
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<{ postId: string; comments: Comment[] }>) => {
        const { postId, comments } = action.payload;
        state[postId] = comments; // postId is now a string
      })
      // Add a new comment
      .addCase(addComment.fulfilled, (state, action: PayloadAction<{ postId: string; newComment: Comment }>) => {
        const { postId, newComment } = action.payload;
        if (!state[postId]) state[postId] = []; // Ensure the post exists
        state[postId].push(newComment); // postId is now a string
      })
      // Add a reply to a comment
      .addCase(addReply.fulfilled, (state, action: PayloadAction<{ postId: string; commentId: number; reply: Reply }>) => {
        const { postId, commentId, reply } = action.payload;
        const comment = state[postId]?.find((c) => c.id === commentId); // postId is now a string
        if (comment) {
          comment.replies.push(reply);
        }
      });
  },
});

export default commentsSlice.reducer;
