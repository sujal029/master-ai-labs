export const metadata = {
  title: "Master AI Labs — AI Systems that Capture Revenue",
  description: "9 proven AI services for Indian businesses.",
};

import "./globals.css"; // IMPORTANT: Tailwind enable

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
