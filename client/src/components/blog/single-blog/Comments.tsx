"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createComment, fetchComments, removeComment } from "@/apis/comment-apis";
import { handleError, handleSuccess } from "@/utils/response-handler";
import Image from "next/image";
import { Send, Trash2 } from "lucide-react";

type CommentItem = {
  _id: string;
  content: string;
  createdAt: string;
  user?: {
    _id: string;
    username: string;
    profilePic?: string;
  };
};

interface CommentsProps {
  blogId: string;
}

export default function Comments({ blogId }: CommentsProps) {
  const [items, setItems] = useState<CommentItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState("");
  const pageSize = 10;
  const initialized = useRef(false);

  const canLoadMore = useMemo(() => page < totalPages, [page, totalPages]);

  const load = async (nextPage: number) => {
    setLoading(true);
    try {
      const data = await fetchComments(blogId, nextPage, pageSize);
      if (nextPage === 1) {
        setItems(data.comments || []);
      } else {
        setItems((prev) => [...prev, ...(data.comments || [])]);
      }
      setTotalPages(data.totalPages || 1);
      setPage(nextPage);
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogId && !initialized.current) {
      initialized.current = true;
      load(1);
    }
  }, [blogId]);

  const onSubmit = async () => {
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await createComment(blogId, content.trim());
      const newItem: CommentItem = res?.comment;
      setItems((prev) => [newItem, ...prev]);
      setContent("");
      handleSuccess(res?.message || "Comment added");
    } catch (e) {
      handleError(e);
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id: string) => {
    try {
      const res = await removeComment(id);
      setItems((prev) => prev.filter((c) => c._id !== id));
      handleSuccess(res?.message || "Comment deleted");
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <div className="px-8 pb-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>

      <div className="flex gap-2 mb-6">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none text-gray-800 placeholder-gray-500"
          maxLength={3000}
        />
        <button
          onClick={onSubmit}
          disabled={submitting || !content.trim()}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-xl disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </div>

      <div className="space-y-4">
        {items.map((c) => (
          <div key={c._id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              {c.user?.profilePic ? (
                <Image src={c.user.profilePic} alt="avatar" width={40} height={40} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                  {c.user?.username?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-900">{c.user?.username || "User"}</div>
                <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-gray-800 mt-1 whitespace-pre-wrap">{c.content}</div>
            </div>
            <button
              onClick={() => onDelete(c._id)}
              className="text-gray-500 hover:text-red-600"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        {canLoadMore && (
          <button
            onClick={() => load(page + 1)}
            disabled={loading}
            className="w-full border border-gray-300 rounded-xl py-3 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}
