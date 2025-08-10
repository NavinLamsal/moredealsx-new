import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import axios from "axios";


// commentsApi.js

// Fetch comments for a specific post
export const fetchCommentsApi = async (postId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}blogs/${postId}/comments/list/`
    );
    return response.data.data; // Axios automatically parses JSON
  } catch (error) {
    throw new Error("Failed to fetch comments");
  }
};

// Post a new comment to a specific post
export const postCommentApi = async (postId:string, body:string) => {
  try {
    const response = await MoreClubApiClient.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}blogs/${postId}/comments/list/`,
      { body: body }
    );

    return response.data.data; // Return the posted comment data
  } catch (error) {
    throw new Error("Failed to post comment");
  }
};

// Post a reply to a specific comment
export const postReplyApi = async (postId:string, commentId:number, reply:string) => {
  try {
    const response = await MoreClubApiClient.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}blogs/${postId}/comments/list/`,
      {
        body: reply,
        reply_to: commentId,
      }
    );
    return response.data.data; // Return the posted reply data
  } catch (error) {
    throw new Error("Failed to post reply");
  }
};
