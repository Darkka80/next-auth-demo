import type { Metadata } from "next";
import '../styles/globals.scss';
import { AuthProvider } from '../Context/AuthContext'

export const metadata : Metadata = {
  title: 'Auth App',
  description: 'Simple auth flow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}
