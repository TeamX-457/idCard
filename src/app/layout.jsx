import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "SmartTrack IoT",
  description: "ID card and attendance management console"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
