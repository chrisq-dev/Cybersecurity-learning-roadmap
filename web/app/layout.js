import "./globals.css";
import TopNav from '../components/TopNav';

const BASE_URL = "https://cbsdev.lat";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ciberseguridad — Guías gratis en español",
    template: "%s | Ciberseguridad",
  },
  description: "Ruta estructurada para aprender ciberseguridad en español: fundamentos, redes, Linux, seguridad web, Blue Team, cloud y empleabilidad. 103 guías gratuitas.",
  keywords: ["ciberseguridad en español", "aprender ciberseguridad", "blue team", "seguridad web", "owasp", "linux seguridad", "cloud security", "guias ciberseguridad gratis"],
  authors: [{ name: "Christian Quiñones", url: BASE_URL }],
  creator: "Christian Quiñones",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Ciberseguridad — Guías gratis en español",
    description: "Ruta estructurada para aprender ciberseguridad en español: fundamentos, redes, Linux, seguridad web, Blue Team, cloud y empleabilidad.",
    url: BASE_URL,
    siteName: "Ciberseguridad",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ciberseguridad — Guías gratis en español · cbsdev.lat",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ciberseguridad — Guías gratis en español",
    description: "103 guías ordenadas para aprender ciberseguridad en español desde cero.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <div className="layout-container">
          <TopNav />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
