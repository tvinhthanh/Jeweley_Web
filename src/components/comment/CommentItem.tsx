import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

type CommentProps = {
  id: number;
  content: string;
  createdAt: string;
  rating: number;
  isReview?: boolean; // Thêm dòng này
  user: {
    id: number;
    name: string;
    avatar: string;
  };
};

export default function CommentItem({
  content,
  createdAt,
  rating,
  user,
}: CommentProps) {
  const safeRating = Number.isFinite(rating) ? rating : 0;
  const formattedTime = createdAt
    ? formatDistanceToNow(new Date(createdAt), {
        addSuffix: true,
        locale: vi,
      })
    : "";

  return (
    <div className="flex gap-4 border-b py-6">
      {/* Avatar */}
      <div className="w-12 h-12 relative flex-shrink-0">
        <Image
          src={user?.avatar || "/avatars/default.jpg"}
          alt={user?.name || "User"}
          fill
          className="rounded-full object-cover"
        />
      </div>

      {/* Nội dung */}
      <div className="flex-1 space-y-1">
        <p className="font-semibold text-sm">{user?.name || "Khách"}</p>

        {/* Rating stars */}
        <div className="text-yellow-500 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={`star-${i}`} className={i < safeRating ? "" : "text-gray-300"}>
              {i < safeRating ? "★" : "☆"}
            </span>
          ))}
          <div className="flex items-center gap-4 text-xs text-blue-600 mt-1">
          <span>{formattedTime}</span>
        </div>
        </div>

        <p className="text-sm text-gray-700">{content}</p> 
      </div>
    </div>
  );
}
