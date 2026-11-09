import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import LuxuryBackground from '@/components/LuxuryBackground';

export const metadata = {
  title: 'Yovarin | Bespoke Enterprise Web Applications, ERPNext & AI Architecture',
  description: 'Bespoke enterprise engineering firm specializing in high-performance Next.js web applications, full-cycle ERPNext implementations, Yovarin Desk, and private read-only AI Pilots.',
  keywords: [
    'luxury enterprise web development',
    'ERPNext implementation',
    'Frappe framework architect',
    'Next.js 14 luxury web app',
    'Yovarin Desk theme',
    'read-only AI copilot',
    'bespoke software engineering'
  ],
  authors: [{ name: 'Yovarin Technologies' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Yovarin | Bespoke Enterprise Web & ERP Solutions',
    description: 'Elevate your operations with bespoke Next.js web applications, ERPNext implementation, and private read-only AI copilots.',
    url: 'https://yovarin.com',
    siteName: 'Yovarin Technologies',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#c59b4c',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen relative font-sans antialiased overflow-x-hidden transition-colors duration-500">
        <ThemeProvider>
          {/* Global Layered Luxury Background Canvas */}
          <LuxuryBackground />
          
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
