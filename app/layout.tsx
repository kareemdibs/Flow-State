import type { Metadata } from "next";
import "./globals.css";
import { PhoneFrame } from "@/components/PhoneFrame";

export const metadata: Metadata = {
  title: "Performance Path — see how music moves you",
  description:
    "An HCI prototype for athletes. Music as a tool for self-understanding, not just a playlist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-paper">
        <PhoneFrame>{children}</PhoneFrame>
      </body>
    </html>
  );
}
