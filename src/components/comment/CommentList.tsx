/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import CommentItem from "./CommentItem";
import { fetchProductReviews, submitProductReview } from "@/services/reviews";
import { Comment } from "@/lib/types/types";

export default function CommentList({ objectId }: { objectId: number }) {
  const { user } = useAppContext();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

  const loadComments = async (pageNum = 1) => {
    try {
      setLoading(true);
      const data = await fetchProductReviews(objectId, pageNum, 5);

      const safeComments = Array.isArray(data.comments) ? data.comments : [];

      if (pageNum === 1) {
        setComments(safeComments);
      } else {
        setComments((prev) => [...prev, ...safeComments]);
      }

      setHasMore(Boolean(data.hasMore));
    } catch (err) {
      console.error("Lỗi khi tải bình luận:", err);
      setError("Không thể tải bình luận");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadComments(1);
  }, [objectId]);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      await submitProductReview({
        product_id: objectId,
        text: newComment,
        rating,
      });

      setNewComment("");
      setRating(5);
      setPage(1);
      await loadComments(1);
    } catch (err) {
      alert("Bạn chưa mua sản phẩm này để đánh giá!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      {comments.length > 0 && (
        <div className="text-lg font-semibold">{comments.length} Bình luận</div>
      )}

      {user && (
        <div className="space-y-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Nhập bình luận..."
            className="w-full border p-2 rounded"
          />
          <div className="flex items-center gap-2">
            <label>Đánh giá:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-1 rounded"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} ⭐
                </option>
              ))}
            </select>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Đang gửi..." : "Gửi"}
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
      {loading && <p className="text-sm text-gray-400">Đang tải bình luận...</p>}

      {comments.map((c) => (
        <CommentItem rating={0} key={c.id} {...c} />
      ))}

      {hasMore && !loading && (
        <button
          onClick={() => {
            const nextPage = page + 1;
            setPage(nextPage);
            loadComments(nextPage);
          }}
          className="mt-4 text-sm px-4 py-2 rounded border hover:bg-gray-50"
        >
          Xem thêm
        </button>
      )}

      {!user && !comments.length && !loading && (
        <p className="text-sm text-blue-600">
          Hãy là người đầu tiên đánh giá!{" "}
          <a href="/login" className="font-semibold text-black hover:underline">
            Đăng nhập
          </a>
        </p>
      )}
    </div>
  );
}
