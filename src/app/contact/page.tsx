import { Suspense } from "react";
import ClientWrapper from "./ClientWrapper";

export default function Contact() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Đang tải...</div>}>
      <ClientWrapper />
    </Suspense>
  );
}
