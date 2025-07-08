/* eslint-disable @typescript-eslint/no-unused-vars */
const convertToVietnamTime = (utcString: string) => {
  const date = new Date(utcString + "Z"); // Thêm "Z" để chuyển về UTC ISO
  const vnOffset = 7 * 60; // GMT+7 in minutes
  const localDate = new Date(date.getTime() + vnOffset * 60 * 1000);

  return localDate.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
