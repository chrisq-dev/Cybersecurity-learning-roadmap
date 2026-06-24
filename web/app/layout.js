import "./globals.css";
import TopNav from '../components/TopNav';
export const metadata = {
  title: "Ciberseguridad - Guías de Estudio",
  description: "Guías ordenadas, laboratorios y recursos de ciberseguridad en español.",
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
