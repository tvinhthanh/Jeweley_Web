// ✅ app/profile/page.tsx — Server Component (không dùng dynamic ở đây)
import ClientWrapper from "./ClientWrapper";

export default function Profile({ searchParams }: { searchParams: { tab?: string } }) {
  const tab = searchParams.tab || "info";
  return <ClientWrapper initialTab={tab} />;
}
