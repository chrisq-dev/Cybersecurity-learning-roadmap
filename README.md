# Cybersecurity Learning Roadmap

Hola, soy Christian Quiñones. Disene esta web para recopilar y ordenar recursos de ciberseguridad en espanol: fundamentos, redes, Linux, seguridad web, Blue Team, Cloud Security, AppSec, GRC, laboratorios, playbooks y empleabilidad.

El objetivo es que cualquier estudiante pueda entrar, elegir una ruta y avanzar poco a poco sin perderse entre archivos sueltos. La web funciona como una biblioteca de guias: cada modulo tiene temas ordenados, buscador, filtros por nivel y marcadores locales de lectura.

![Preview de la web](assets/preview-home.png)

## Que Es

Una guia publica para aprender ciberseguridad de forma estructurada, practica y etica.

Este repositorio no busca ser una coleccion de comandos ni una lista de tareas. Busca explicar conceptos, conectar temas y servir como referencia para estudiar con orden.

## Que Incluye

- Fundamentos de computacion, sistemas operativos, identidad y riesgo.
- Redes, Cisco, modelo OSI/TCP-IP, DNS, DHCP, NAT, VLANs y ACLs.
- Linux, Windows y Active Directory.
- Python y automatizacion para seguridad.
- Seguridad web, HTTP, OWASP Top 10, SQL Injection, XSS, CSRF, SSRF y file upload.
- Blue Team, logs, SIEM, MITRE ATT&CK, Sigma, YARA, deteccion y respuesta a incidentes.
- Cloud Security, IAM, storage, logging, Kubernetes y contenedores.
- AppSec, DevSecOps, API Security, GRC, privacidad y continuidad.
- Wireless, Network Security, Endpoint Security y Database Security.
- Playbooks, labs guiados, capstones, writeups y recursos de empleabilidad.

## Como Usarla

Empieza por:

1. [Inicio Aqui](INICIO-AQUI.md)
2. [Computacion Basica](fundamentos/COMPUTACION-BASICA.md)
3. [Base de Seguridad](fundamentos/BASE-DE-SEGURIDAD.md)
4. [Fundamentos de Redes](redes-cisco/FUNDAMENTOS-REDES.md)
5. [Fundamentos Web](web-owasp/FUNDAMENTOS-WEB.md)

La ruta recomendada es:

```text
fundamentos -> redes -> Linux -> web -> Blue Team -> cloud/AppSec -> labs -> portafolio
```

## Web

La web esta hecha con Next.js y lee las guias Markdown del repositorio.

```bash
cd web
npm install
npm run dev
```

Despues abre:

```text
http://localhost:3000
```

Healthcheck:

```text
/api/health
```

## Docker

El proyecto incluye `Dockerfile` y `docker-compose.yml`.

```bash
docker build -t cybersecurity-learning-roadmap .
docker run --rm -p 3000:3000 cybersecurity-learning-roadmap
```

Para Easypanel, revisa [DEPLOY-EASYPANEL.md](DEPLOY-EASYPANEL.md).

## Etica

Todo el contenido es educativo.

Cualquier prueba, escaneo, explotacion o analisis debe realizarse solo en:

- sistemas propios;
- laboratorios locales;
- plataformas de practica autorizadas;
- entornos donde exista permiso explicito.

No uses este material contra terceros, redes publicas, empresas, usuarios o sistemas sin autorizacion.

## Contribuir

Las contribuciones son bienvenidas si respetan el enfoque educativo, defensivo y etico del proyecto.

Antes de proponer cambios, revisa [CONTRIBUTING.md](CONTRIBUTING.md).
