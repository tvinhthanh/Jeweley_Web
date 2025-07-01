// components/CommentItem.tsx
import Image from "next/image";

type CommentProps = {
  avatar: string;
  name: string;
  rating: number;
  text: string;
  time: string;
};

export default function CommentItem({
  avatar,
  name,
  rating,
  text,
  time,
}: CommentProps) {
  return (
    <div className="flex gap-4 border-b py-6">
      <div className="w-12 h-12 relative flex-shrink-0">
        <Image
          src={avatar}
          alt={name}
          fill
          className="rounded-full object-cover"
        />
      </div>

      <div className="flex-1 space-y-1">
        <p className="font-semibold">{name}</p>

        {/* Rating stars */}
        <div className="text-yellow-500 text-sm">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        {/* Text */}
        <p className="text-sm text-gray-700">{text}</p>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-blue-600 mt-1">
          <span>{time}</span>
          <button className="hover:underline">Like</button>
          <button className="hover:underline">Reply</button>
        </div>
      </div>
    </div>
  );
}
