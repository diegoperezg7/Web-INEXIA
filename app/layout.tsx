import "@/styles/globals.css"
import { Rajdhani, Audiowide } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import ChatbotWidget from "@/components/chatbot-widget"
import Script from "next/script"

// Tipografía principal futurista con buena legibilidad
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
})

// Tipografía para títulos ultra futurista
const audiowide = Audiowide({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-audiowide",
})

export const metadata = {
  title: "INEXIA - Agencia de Inteligencia Artificial",
  description: "Agencia de inteligencia artificial y automatización no-code para empresas ágiles. Automatiza tu empresa con IA en días, no en meses.",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;
  const hasCookiebot = typeof cookiebotId === 'string' && cookiebotId.trim().length > 0;
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={`${rajdhani.variable} ${audiowide.variable} ${rajdhani.className}`}>
        {/* Cookiebot solo si hay ID válido */}
        {hasCookiebot && (
          <Script
            id="cookiebot"
            strategy="afterInteractive"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid={cookiebotId}
          />
        )}
        {/* Scripts de analítica solo tras consentimiento explícito */}
        <Script id="analytics-consent" strategy="afterInteractive">
          {`
            window.addEventListener('CookieConsentDeclaration', function() {
              if (window.Cookiebot && window.Cookiebot.consents && window.Cookiebot.consents.statistics) {
                // Aquí puedes inyectar Google Analytics
                // Ejemplo: cargar gtag.js
                if (!window.GA_LOADED) {
                  var s = document.createElement('script');
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
                  s.async = true;
                  document.head.appendChild(s);
                  window.GA_LOADED = true;
                }
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX');
              }
              if (window.Cookiebot && window.Cookiebot.consents && window.Cookiebot.consents.marketing) {
                // Aquí puedes inyectar Hotjar
                if (!window.HJ_LOADED) {
                  (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:0000000,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                    window.HJ_LOADED = true;
                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                }
              }
            });
          `}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <ChatbotWidget />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

