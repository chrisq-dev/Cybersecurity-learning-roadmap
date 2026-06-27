import "./globals.css";
import TopNav from '../components/TopNav';
import ReadingProgress from '../components/ReadingProgress';

const BASE_URL = "https://cbsdev.lat";
const SITE_TITLE = "Mapa abierto de ciberseguridad en español";
const SITE_DESCRIPTION = "Colección abierta de explicaciones y recursos para consultar fundamentos, conectar conceptos y explorar la ciberseguridad en español.";
const SOCIAL_IMAGE = "/og-mapa-ciberseguridad.png";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | cbsdev.lat",
  },
  description: SITE_DESCRIPTION,
  applicationName: "cbsdev.lat",
  keywords: ["ciberseguridad en español", "mapa de ciberseguridad", "fundamentos de ciberseguridad", "blue team", "seguridad web", "OWASP", "Linux", "cloud security"],
  authors: [{ name: "Christian Quiñones", url: BASE_URL }],
  creator: "Christian Quiñones",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    siteName: "cbsdev.lat",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "Mapa abierto de ciberseguridad en español — cbsdev.lat",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
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
