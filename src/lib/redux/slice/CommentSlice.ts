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
  [postId: string]: Comment[];
}

// ✅ Initial State
const initialState: CommentsState = {};

// ✅ Thunk to fetch comments for a specific post
export const fetchComments = createAsyncThunk<
  { postId: number; comments: Comment[] },
  number, // postId
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
  { id: number; newComment: Comment },
  { id: number; body: string },
  { rejectValue: string }
>("comments/addComment", async ({ id, body }, { rejectWithValue }) => {
  try {
    const newComment = await postCommentApi(id, body);
    return { id, newComment };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// ✅ Thunk to add a reply to a specific comment
export const addReply = createAsyncThunk<
  { id: number; commentId: number; reply: Reply },
  { id: number; commentId: number; reply: string },
  { rejectValue: string }
>("comments/addReply", async ({ id, commentId, reply }, { rejectWithValue }) => {
  try {
    const newReply = await postReplyApi(id, commentId, reply);
    return { id, commentId, reply: newReply };
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
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<{ postId: number; comments: Comment[] }>) => {
        const { postId, comments } = action.payload;
        state[postId] = comments;
      })
      // Add a new comment
      .addCase(addComment.fulfilled, (state, action: PayloadAction<{ id: number; newComment: Comment }>) => {
        const { id, newComment } = action.payload;
        if (!state[id]) state[id] = []; // Ensure the post exists
        state[id].push(newComment);
      })
      // Add a reply to a comment
      .addCase(addReply.fulfilled, (state, action: PayloadAction<{ id: number; commentId: number; reply: Reply }>) => {
        const { id, commentId, reply } = action.payload;
        const comment = state[id]?.find((c) => c.id === commentId);
        if (comment) {
          comment.replies.push(reply);
        }
      });
  },
});

export default commentsSlice.reducer;
