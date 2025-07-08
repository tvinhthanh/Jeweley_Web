"use client";

import ProfilePage from "./ProfilePage";

export default function ClientWrapper({ initialTab }: { initialTab: string }) {
  return <ProfilePage initialTab={initialTab} />;
}
