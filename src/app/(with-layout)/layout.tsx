import type { Metadata } from "next";
import "../globals.css";
import Header from "../_lib/Header";
import Footer from "../_lib/Footer";

export const metadata: Metadata = {
  title: "Blog Manager",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased flex flex-col justify-between bg-slate-300 text-white`} style={{minHeight: "100vh"}}>
          <Header />
          {children}
          <Footer />
      </body>
    </html>
  );
}
