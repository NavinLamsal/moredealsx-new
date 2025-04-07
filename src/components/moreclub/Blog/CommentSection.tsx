"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchComments, addComment, addReply } from "@/lib/redux/slice/CommentSlice";
import { AppDispatch } from "@/lib/redux/store";
import { useSession } from "next-auth/react";

const CommentSection = ({ slug }: { slug: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {data:session} = useSession()
  const comments = useSelector((state: any) => state.comments[slug] || []);

  const [commentText, setCommentText] = useState("");
  const [cmtIsLoading, setCmtIsLoading] = useState(false);
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const [replyIsLoading, setReplyIsLoading] = useState<{ [key: string]: boolean }>({});
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchComments(slug));
  }, [slug, dispatch]);

  // ✅ Handle new comment
  const handleAddComment = async () => {
    if (commentText.trim()) {
      try {
        setCmtIsLoading(true);
        await dispatch(addComment({ postId:slug, body: commentText })).unwrap();
        toast.success("Comment added successfully");
        setCommentText("");
      } catch (error) {
        toast.error("Failed to add comment");
      } finally {
        setCmtIsLoading(false);
      }
    } else {
      toast.warning("Comment cannot be empty");
    }
  };

  // ✅ Handle new reply
  const handleAddReply = async (commentId: number) => {
    const replyText = replyTexts[commentId];
    if (replyText.trim()) {
      try {
        setReplyIsLoading((prev) => ({ ...prev, [commentId]: true }));
        await dispatch(addReply({ postId:slug ,  commentId, reply: replyText })).unwrap();
        toast.success("Reply added successfully");
        setReplyTexts((prev) => ({ ...prev, [commentId]: "" }));
      } catch (error) {
        toast.error("Failed to add reply");
      } finally {
        setReplyIsLoading((prev) => ({ ...prev, [commentId]: false }));
      }
    } else {
      toast.warning("Reply cannot be empty");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>

      {/* ✅ Comment Input Box */}
      <div className="mb-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:border-primary"
          rows={3}
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        {/* {Cookies.get("moretechglobal_access") ? ( */}
         {!!session ?
          <button
            className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
            onClick={handleAddComment}
            disabled={cmtIsLoading}
          >
            {cmtIsLoading ? "Posting..." : "Post Comment"}
          </button>
         :
          <a href="/login" className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition inline-block">
            Login to Post Comment
          </a>
        }
        {/* ) : ( */}
        {/* )} */}
      </div>

      {/* ✅ Comments List */}
      <div className="space-y-6">
        {comments.map((comment: any) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            {/* Comment Header */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-800 font-semibold rounded-full">
                {comment.user[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{comment.user}</p>
                <span className="text-xs text-gray-500">{moment.utc(comment.created).local().fromNow()}</span>
              </div>
            </div>

            {/* Comment Text */}
            <p className="mt-2 text-gray-800">{comment.body}</p>

            {/* ✅ Replies Section */}
            {comment.replies?.length > 0 && (
              <div className="mt-4 pl-6 border-l-2 border-gray-300 space-y-3">
                {comment.replies.map((reply: any) => (
                  <div key={reply.id} className="bg-gray-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-400 text-gray-900 font-semibold rounded-full">
                        {reply.user[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{reply.user}</p>
                        <span className="text-xs text-gray-500">{moment.utc(reply.created).local().fromNow()}</span>
                      </div>
                    </div>
                    <p className="mt-1 text-gray-700">{reply.body}</p>
                  </div>
                ))}
              </div>
            )}

            {/* ✅ Reply Button & Input */}
            {/* {Cookies.get("moretechglobal_access") && ( */}
              <div className="mt-2 text-primary cursor-pointer text-sm" onClick={() => setActiveReplyCommentId(comment.id)}>
                ↩ Add your reply
              </div>
            {/* )} */}

            {activeReplyCommentId === comment.id && (
              <div className="mt-3 space-y-2">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:border-primary"
                  rows={2}
                  placeholder="Write a reply..."
                  value={replyTexts[comment.id] || ""}
                  onChange={(e) => setReplyTexts((prev) => ({ ...prev, [comment.id]: e.target.value }))}
                />
                <div className="flex space-x-2">
                  <button
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                    onClick={() => setActiveReplyCommentId(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    onClick={() => handleAddReply(comment.id)}
                    disabled={replyIsLoading[comment.id]}
                  >
                    {replyIsLoading[comment.id] ? "Posting..." : "Reply"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
