import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ciao Pasta Catering",
  description: "Order catering from Ciao Pasta",
  manifest: "/manifest.json",
  themeColor: "#ffffff",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ciao Pasta Catering"
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <div className="container flex items-center justify-center h-16">
            <div className="text-3xl font-bold text-black">Ciao Pasta Catering</div>
          </div>
        </header>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}

