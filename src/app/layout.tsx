import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";
import Script from "next/script";
// import { Toaster } from "react-hot-toast"; // Убран импорт toast системы

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "УниПлатформа - Университетская платформа для студентов",
  description: "Современная университетская платформа для студентов. Расписание, оценки, новости, курсы и многое другое в одном месте.",
  keywords: ["университет", "студенты", "расписание", "оценки", "образование", "платформа"],
  authors: [{ name: "Университет" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <DashboardLayout>
          {children}
        </DashboardLayout>
        
        {/* Toaster для уведомлений отключен по запросу пользователя */}
        {/* <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              fontSize: '0.875rem',
              fontWeight: '500',
              padding: '12px 16px',
              boxShadow: 'var(--shadow-lg)',
              backdropFilter: 'blur(20px)',
            },
            success: {
              iconTheme: {
                primary: 'var(--accent-green)',
                secondary: 'white',
              },
              style: {
                borderLeft: '4px solid var(--accent-green)',
              },
            },
            error: {
              iconTheme: {
                primary: 'var(--accent-red)',
                secondary: 'white',
              },
              style: {
                borderLeft: '4px solid var(--accent-red)',
              },
            },
            loading: {
              iconTheme: {
                primary: 'var(--accent-blue)',
                secondary: 'white',
              },
              style: {
                borderLeft: '4px solid var(--accent-blue)',
              },
            },
          }}
        /> */}
        
        {/* Bootstrap JavaScript */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
