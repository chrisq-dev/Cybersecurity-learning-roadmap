import Link from "next/link";
import { ROADMAP_STEPS } from "../../lib/roadmap";

export const metadata = {
  title: "Rutas temáticas",
  description: "Secuencias de lectura para explorar el mapa de ciberseguridad por interés profesional.",
  alternates: { canonical: "https://cbsdev.lat/rutas" },
};

const routes = [
  {
    "title": "Seguridad personal y familia",
    "description": "Protege cuentas, dispositivos y personas antes de profundizar en seguridad técnica.",
    "audience": "Cualquier persona",
    "items": [
      ["Protégete en internet", "/seguridad-personal/protegete-en-internet"],
      ["Cuentas y contraseñas", "/seguridad-personal/cuentas-y-contrasenas"],
      ["Privacidad diaria", "/seguridad-personal/privacidad-diaria"],
      ["Celular y dispositivos", "/seguridad-personal/celular-y-dispositivos"],
      ["Estafas con IA", "/seguridad-personal/estafas-con-ia"],
      ["Si te hackearon", "/seguridad-personal/si-te-hackearon"],
      ["Familia y usuarios no técnicos", "/seguridad-personal/familia-y-usuarios-no-tecnicos"]
    ]
  },
  {
    "title": "Fundamentos desde cero",
    "description": "Base técnica para entender el resto del mapa sin asumir conocimientos previos.",
    "audience": "Personas que comienzan",
    "items": [
      [
        "Computación básica",
        "/fundamentos/computacion-basica"
      ],
      [
        "Sistemas operativos",
        "/fundamentos/sistemas-operativos"
      ],
      [
        "Identidad y permisos",
        "/fundamentos/identidad-permisos"
      ],
      [
        "Fundamentos de redes",
        "/redes-cisco/fundamentos-redes"
      ],
      [
        "Fundamentos de Linux",
        "/linux/fundamentos-linux"
      ],
      [
        "Fundamentos web",
        "/web-owasp/fundamentos-web"
      ]
    ]
  },
  {
    "title": "Seguridad de aplicaciones y backend",
    "description": "Riesgos y controles para aplicaciones web, APIs y ciclos de desarrollo.",
    "audience": "Desarrollo backend y AppSec",
    "items": [
      [
        "HTTP",
        "/web-owasp/http"
      ],
      [
        "Autenticación y autorización",
        "/web-owasp/autenticacion-autorizacion"
      ],
      [
        "OWASP Top 10:2025",
        "/web-owasp/owasp-top-10"
      ],
      [
        "Fundamentos de API",
        "/api-security/fundamentos-api"
      ],
      [
        "Riesgos y controles de API",
        "/api-security/riesgos-controles"
      ],
      [
        "Fundamentos de AppSec",
        "/appsec-devsecops/fundamentos-appsec"
      ],
      [
        "DevSecOps",
        "/appsec-devsecops/devsecops"
      ]
    ]
  },
  {
    "title": "Defensa y respuesta",
    "description": "Conceptos para comprender detección, análisis, respuesta y mejora continua.",
    "audience": "Blue Team y SOC",
    "items": [
      [
        "Fundamentos Blue Team",
        "/blue-team/fundamentos-blue-team"
      ],
      [
        "Logs y alertas",
        "/blue-team/logs-y-alertas"
      ],
      [
        "SIEM y MITRE ATT&CK",
        "/blue-team/siem-mitre"
      ],
      [
        "Detection Engineering",
        "/blue-team/detection-engineering"
      ],
      [
        "Threat Hunting",
        "/blue-team/threat-hunting"
      ],
      [
        "Respuesta a incidentes",
        "/blue-team/respuesta-incidentes"
      ]
    ]
  },
  {
    "title": "Cloud, contenedores e identidad",
    "description": "Modelo compartido de responsabilidad, acceso, observabilidad y arquitectura.",
    "audience": "Cloud y Security Engineering",
    "items": [
      [
        "Fundamentos cloud",
        "/cloud-security/fundamentos-cloud"
      ],
      [
        "IAM, storage y logging",
        "/cloud-security/iam-storage-logging"
      ],
      [
        "IAM avanzado",
        "/cloud-security/iam-avanzado"
      ],
      [
        "Contenedores",
        "/containers-kubernetes/contenedores"
      ],
      [
        "Seguridad de Kubernetes",
        "/containers-kubernetes/kubernetes-seguridad"
      ],
      [
        "Zero Trust",
        "/security-architecture/zero-trust"
      ]
    ]
  },
  {
    "title": "Gobierno, riesgo y privacidad",
    "description": "Cómo se conecta la seguridad técnica con decisiones, controles y obligaciones.",
    "audience": "GRC, auditoría y liderazgo",
    "items": [
      [
        "Fundamentos GRC",
        "/grc/fundamentos-grc"
      ],
      [
        "Riesgo y controles",
        "/grc/riesgo-controles"
      ],
      [
        "Fundamentos de privacidad",
        "/privacy/fundamentos-privacidad"
      ],
      [
        "Continuidad y DRP",
        "/business-continuity/continuidad-drp"
      ],
      [
        "Backups",
        "/business-continuity/backups"
      ],
      [
        "Arquitectura de seguridad",
        "/security-architecture/fundamentos-arquitectura"
      ]
    ]
  },
  {
    "title": "Seguridad de IA y aplicaciones agénticas",
    "description": "Riesgos de modelos, datos, RAG, herramientas y autonomía.",
    "audience": "Equipos de IA, desarrollo y seguridad",
    "items": [
      [
        "Fundamentos de IA",
        "/ai-security/fundamentos-ia"
      ],
      [
        "OWASP Top 10 para LLMs",
        "/ai-security/owasp-top-10-llm"
      ],
      [
        "IA en defensa",
        "/ai-security/ia-en-defensa"
      ],
      [
        "Seguridad de API",
        "/api-security/riesgos-controles"
      ],
      [
        "Supply chain",
        "/appsec-devsecops/devsecops"
      ]
    ]
  },
  {
    "title": "Carrera y panorama profesional",
    "description": "Áreas, roles y criterios para orientar una trayectoria sin convertirla en una receta única.",
    "audience": "Personas explorando el sector",
    "items": [
      [
        "Mapa de skills",
        "/empleabilidad/mapa-de-skills"
      ],
      [
        "Rutas por rol",
        "/empleabilidad/rutas-por-rol"
      ],
      [
        "Proyectos de portafolio",
        "/empleabilidad/proyectos-portafolio"
      ],
      [
        "CV y LinkedIn",
        "/empleabilidad/cv-linkedin"
      ],
      [
        "Entrevistas",
        "/empleabilidad/entrevistas"
      ],
      [
        "Cursos y certificaciones",
        "/recursos/cursos-y-certificaciones"
      ]
    ]
  }
];

export default function RoutesPage() {
  return (
    <div className="routes-page">
      <header className="routes-header">
        <h1 className="serif-title">Rutas temáticas</h1>
        <p>Estas rutas organizan lecturas; no son cursos, laboratorios ni secuencias obligatorias. Elige la que corresponda a lo que quieres comprender.</p>
      </header>
      <div className="routes-grid">
        {routes.map((route) => (
          <section className="route-sequence" key={route.title}>
            <p className="route-audience">{route.audience}</p>
            <h2>{route.title}</h2>
            <p>{route.description}</p>
            <ol>
              {route.items.map(([label, href]) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <section className="linear-route" id="ruta-lineal" aria-labelledby="linear-route-title">
        <p className="route-audience">Secuencia lineal</p>
        <h2 id="linear-route-title">Ruta de estudio recomendada</h2>
        <p>
          Si prefieres un orden general antes de elegir una especialidad, recorre estos doce
          pasos. Cada uno enlaza a la guía de entrada del tema.
        </p>
        <div className="roadmap-strip">
          {ROADMAP_STEPS.map((step, index) => (
            <div key={step.num} className="roadmap-item">
              <Link href={step.href} className="roadmap-step">
                <span className="roadmap-step-num">{step.num}</span>
                <span className="roadmap-step-label">{step.label}</span>
              </Link>
              {index < ROADMAP_STEPS.length - 1 && (
                <span className="roadmap-arrow" aria-hidden="true">→</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
