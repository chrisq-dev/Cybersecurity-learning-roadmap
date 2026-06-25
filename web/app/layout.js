import "./globals.css";
import TopNav from '../components/TopNav';
import ReadingProgress from '../components/ReadingProgress';

const BASE_URL = "https://cbsdev.lat";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ciberseguridad — Guías gratis en español",
    template: "%s | Ciberseguridad",
  },
  description: "Ruta estructurada para aprender ciberseguridad en español: fundamentos, redes, Linux, seguridad web, Blue Team, cloud, respuesta a incidentes y empleabilidad.",
  keywords: ["ciberseguridad en español", "aprender ciberseguridad", "blue team", "seguridad web", "owasp", "linux seguridad", "cloud security", "guías ciberseguridad gratis"],
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
    description: "Guías ordenadas para aprender ciberseguridad en español desde cero.",
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
  const themeScript = `
    (function () {
      try {
        var storedTheme = window.localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = storedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.dataset.theme = theme;
      } catch (error) {
        document.documentElement.dataset.theme = 'light';
      }
    })();
  `;

  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ReadingProgress />
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
