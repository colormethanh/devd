import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "./components/ReduxProvider";
import Navbar from "./components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Devd",
  description: "An app for things 'devd'",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <div className="flex flex-col">
            <Navbar />
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
