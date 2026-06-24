import "./globals.css";
import TopNav from '../components/TopNav';
export const metadata = {
  title: "Ciberseguridad - Apuntes y Guías",
  description: "Guías, laboratorios y apuntes de ciberseguridad en español.",
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
