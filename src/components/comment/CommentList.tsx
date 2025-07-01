"use client";

import { useAppContext } from "@/context/AppContext";
import CommentItem from "./CommentItem";

interface Comment {
  avatar: string;
  name: string;
  rating: number;
  text: string;
  time: string;
  objectId: string;
  objectType: string;
}

const allComments: Comment[] = [
  {
    avatar: "/avatars/avatar1.jpg",
    name: "Sofia Harvetz",
    rating: 5,
    text: "Awesome product!",
    time: "about 1 hour ago",
    objectId: "nhan-kim-cuong-nkc1201",
    objectType: "product",
  },
  {
    avatar: "/avatars/avatar2.jpg",
    name: "Nicolas Jensen",
    rating: 5,
    text: "I love this item!",
    time: "2 hours ago",
    objectId: "nhan-kim-cuong-nkc1201",
    objectType: "product",
  },
  // ... more comments
];

export default function CommentList({
  objectId,
  objectType = "product",
}: {
  objectId: string;
  objectType?: string;
}) {
  const { user } = useAppContext();

  const filtered = allComments.filter(
    (c) => c.objectId === objectId && c.objectType === objectType
  );

  return (
    <div className="space-y-4 mt-6">
      {/* Tổng số bình luận */}
      {filtered.length > 0 && (
        <div className="text-lg font-semibold">
          {filtered.length} Bình luận
        </div>
      )}

      {filtered.length > 0 ? (
        <>
          {filtered.map((c, i) => (
            <CommentItem key={i} {...c} />
          ))}
          <button className="mt-4 text-sm px-4 py-2 rounded border hover:bg-gray-50 flex items-center justify-center">
            Load more
          </button>
        </>
      ) : !user ? (
        <p className="text-sm text-blue-600">
          Hãy là người đầu tiên đánh giá!{" "}
          <a href="/login" className="font-semibold text-black hover:underline">
            Đăng nhập
          </a>
        </p>
      ) : (
        <p className="text-sm text-gray-500">Hãy là người đầu tiên đánh giá!</p>
      )}
    </div>
  );
}
