---
title: "Continuidad y DRP: El Simulacro de Incendio"
level: "intermedio"
content_type: "guia"
updated: "2026-06-29"
---

# Continuidad y DRP: El Simulacro de Incendio

## Objetivo de esta Guía

Aprender la diferencia entre saber qué hacer en teoría, y saber qué hacer cuando el edificio realmente está en llamas.

Los respaldos (Guía anterior) son solo los datos brutos. Es como tener los planos del motor de un avión guardados en un USB (El Backup) — no significa que tengas un avión listo para volar. Necesitas reconstruirlo entero.

El plan paso a paso para reconstruir la empresa desde las cenizas se llama **Disaster Recovery Plan (DRP)**.

Esta guía cubre la estructura de un DRP, los sitios alternos, las pruebas de continuidad, la diferencia entre BCP y DRP, y cómo los atacantes explotan una mala planificación de recuperación.

---

## 1. Fundamentos de Continuidad de Negocio

### BCP vs DRP: La Diferencia Crucial

**BCP (Business Continuity Plan):** El plan estratégico que define cómo la empresa sigue operando durante una crisis, incluyendo procesos manuales, sedes alternas de trabajo, comunicación con clientes y proveedores. Ejemplo: "Si el edificio se quema, los empleados trabajarán desde casa usando VPN durante 2 semanas."

**DRP (Disaster Recovery Plan):** El plan táctico que define cómo restaurar los sistemas de TI después de un desastre. Ejemplo: "Si el servidor de base de datos falla, restaurar desde el backup en AWS en el siguiente orden: Active Directory, luego Base de Datos, luego Aplicación Web."

**Diferencia práctica:** El BCP mantiene el negocio vivo (la gente sigue cobrando, los clientes siguen siendo atendidos). El DRP reconstruye la tecnología (los servidores, las redes, los datos). Una empresa necesita ambos.

### El Desastre: Definición y Tipos

Un desastre no es una falla menor (un disco duro que muere). Un desastre es un evento que interrumpe las operaciones críticas por un período prolongado:

| Tipo de Desastre | Ejemplo | Frecuencia |
|-----------------|---------|-----------|
| Natural | Terremoto, inundación, huracán, incendio forestal | Baja, pero catastrófico |
| Técnico | Falla masiva de servidor, corrupción de base de datos, corte eléctrico | Media |
| Humano | Error de configuración, borrado accidental, sabotaje interno | Alta |
| Seguridad | Ransomware, APT, DDoS que satura toda la capacidad | Alta y creciente |
| Proveedor | Quiebra del cloud provider, falla del ISP, corte de fibra óptica | Baja |

---

## 2. El Plan de Recuperación de Desastres (DRP)

* **La Analogía (El Simulacro de Incendio):** Cuando suena la alarma de incendios en la escuela, los niños no se sientan a hacer un comité para votar por dónde van a salir. Existe un documento escrito que dice exactamente que el grupo A sale por la puerta 1, y el grupo B sale por la puerta 2.

* **En Informática:** A las 3:00 AM, un ransomware encripta los servidores principales de la empresa. El CISO saca la carpeta roja del DRP. El documento dice exactamente:

 1. A quién hay que llamar por teléfono (El orden de escalamiento).
 2. En qué orden exacto se deben encender los servidores de repuesto. (Si enciendes la Base de Datos antes de encender el Active Directory, el sistema colapsará).
 3. Quién va a redactar el comunicado de prensa para los clientes.

### Componentes de un DRP Corporativo

Un DRP profesional debe contener:

**1. Roles y Responsabilidades:**
- Líder de recuperación (CISO o CIO): Autoriza la activación del DRP.
- Equipo de comunicaciones: Notifica a empleados, clientes, proveedores, reguladores.
- Equipo técnico: Ejecuta la restauración de sistemas.
- Equipo legal: Evalúa responsabilidades y obligaciones contractuales.
- RRHH: Gestiona el bienestar de empleados y la logística.

**2. Matriz de Prioridades de Recuperación:**
Define el orden en que los sistemas deben restaurarse. No todos los sistemas son igual de críticos:

| Sistema | Prioridad | RTO Objetivo | RPO Objetivo |
|---------|-----------|-------------|-------------|
| Autenticación (AD) | 1 | 1 hora | 15 min |
| Base de datos transaccional | 2 | 2 horas | 5 min |
| Aplicación web de ventas | 3 | 4 horas | 1 hora |
| Correo electrónico | 4 | 8 horas | 4 horas |
| Sistema de RRHH | 5 | 48 horas | 24 horas |
| Archivos históricos | 6 | 1 semana | 1 semana |

**3. Procedimientos Técnicos Detallados:**
Pasos exactos, incluyendo comandos específicos:
- Cómo montar el backup desde AWS S3: `aws s3 sync s3://backup-bucket/ /restore/`
- Comandos de restauración de base de datos: `pg_restore -d prod_db /restore/dump.sql`
- Scripts de verificación de integridad post-restauración.

**4. Plan de Comunicación:**
- Plantillas de correos para clientes: "Estimado cliente, estamos experimentando una interrupción del servicio..."
- Comunicado de prensa pre-aprobado por legal.
- Contactos de emergencia de proveedores (ISP, cloud, soporte técnico).

**5. Inventario de Activos:**
Lista completa de servidores, aplicaciones, licencias, contratos de soporte, contactos de fabricantes. Sin esto, el equipo técnico no sabe qué restaurar.

### El Mayor Error: No Probar el Plan

Por qué esto importa: El mayor error de los equipos técnicos es escribir un DRP gigantesco... **y nunca probarlo**. Un plan que no ha sido probado en un simulacro, es un plan que va a fallar durante la crisis real.

### Tipos de Pruebas de DRP

- **Tabletop Exercise (Prueba de Mesa):** El equipo se sienta en una sala con el DRP impreso. El facilitador describe un escenario de desastre (Ej: "Son las 3:00 AM, un ransomware acaba de encriptar todos los servidores de la empresa. ¿Qué hace cada uno?"). Se discuten los pasos sin tocar sistemas reales. Es barata y rápida.
- **Walkthrough (Recorrido Guiado):** El equipo técnico ejecuta los pasos del DRP en un entorno de pruebas. Verifica que los scripts funcionan y los backups son legibles.
- **Simulación (Simulation):** Se ejecuta el DRP en un entorno de respaldo (Warm Site o nube) con datos reales. Se mide el RTO real vs objetivo.
- **Full Test (Prueba Completa):** Se apaga el centro de datos principal y se obliga a la empresa a operar desde el Hot Site durante 24-48 horas. Es la prueba más realista, pero también la más costosa y riesgosa.

**Frecuencia recomendada:** Tabletop cada 3 meses. Walkthrough cada 6 meses. Simulación cada 12 meses. Full test cada 2 años (o cuando haya cambios arquitectónicos mayores).

---

## 3. Los Sitios Alternos (La Base Secreta)

Si tu Centro de Datos principal en Nueva York quedó bajo el agua por un huracán, necesitas encender tus operaciones en otro lugar físico. Si no tienes un plan para esto, te quedas literalmente en la calle.

* **Hot Site (Sitio Caliente):** Es un centro de datos idéntico en Texas. Tiene las mismas computadoras, el mismo software, y está sincronizado en tiempo real.
 * *Ventaja:* El RTO (Tiempo de Recuperación) es de casi 0 minutos. Aprietas un botón y la empresa sigue operando.
 * *Desventaja:* Cuesta literalmente el doble de dinero, porque estás pagando por mantener encendidos dos centros de datos gigantes al mismo tiempo.

* **Cold Site (Sitio Frío):** Es un edificio vacío rentado en Texas que tiene electricidad e internet, pero no tiene computadoras.
 * *Ventaja:* Es extremadamente barato.
 * *Desventaja:* Si ocurre el desastre, el equipo de IT tiene que viajar a Texas, ir a comprar servidores físicos, instalarlos, descargar los respaldos y configurarlo todo. El RTO será de semanas o meses.

* **Warm Site (Sitio Tibio):** El punto medio. Tiene computadoras viejas listas para encenderse, pero los datos no están sincronizados en tiempo real. Tardarás un par de días en levantar la operación.

### Recuperación en la Nube (Cloud DR)

Cada vez más empresas abandonan los sitios físicos y usan la nube como sitio de respaldo:

**AWS Disaster Recovery:**
- **AWS Elastic Disaster Recovery (DRS):** Replica servidores on-premises a AWS en tiempo real. Usa replicación de bloques continua. RTO de minutos, RPO de segundos.
- **AWS Backup:** Servicio centralizado de backups. Soporta EC2, RDS, EFS, DynamoDB, S3. Políticas de retención automatizadas (GFS).

**Azure Site Recovery:**
- **Azure Site Recovery (ASR):** Replica máquinas virtuales de Hyper-V, VMware o servidores físicos a Azure. RTO de minutos.
- **Azure Backup:** Backup de VMs, SQL Server, SAP HANA y Azure Files. Retención configurable.

**Google Cloud:**
- **Backup and DR Service:** Servicio gestionado de backup y recuperación para GCP y on-premises.
- **Persistent Disk Snapshots:** Snapshots de discos persistentes con capacidad de restore rápido.

* **Por qué esto importa:** La nube elimina la necesidad de mantener un centro de datos físico de respaldo (Hot Site es carísimo). Pero introduce dependencia del proveedor cloud: si AWS/Azure/GCP tienen una caída regional, tu DRP también falla. La estrategia multicloud (respaldar en AWS y Azure simultáneamente) mitiga esto.

---

## 4. El Ángulo del Hacker

Un atacante que conoce tu DRP (o sabe que no tienes uno) ajusta su ataque:

- **Atacar los backups primero:** Un ransomware moderno (LockBit, BlackCat/ALPHV) busca y encripta también los backups. Si el backup está en la misma red que los servidores de producción, el atacante lo encuentra usando herramientas como `find / -name "*.bak" -o -name "*.vbk" -o -name "*.vhd"`. Por esto la regla 3-2-1 exige una copia fuera de línea (air-gapped).
- **Atacar en el peor momento:** Los atacantes investigan los ciclos de backup de la empresa. Saben que el backup completo ocurre los domingos. Atacan un viernes a las 5:00 PM. El RPO será de 48 horas de datos perdidos.
- **Destruir la documentación:** El DRP suele estar guardado en el servidor de archivos corporativo. Si el atacante lo encuentra, lo borra o cifra. El equipo técnico no sabe ni a quién llamar ni en qué orden restaurar. El DRP debe existir también en formato físico (carpeta roja en la caja fuerte del CISO).
- **Sabotear la recuperación:** Un atacante avanzado (APT) modifica sutilmente los datos en los backups semanas antes del ataque (ataque de corrupción lenta). Cuando el equipo intenta restaurar, los datos están corruptos y los backups son inútiles.

**Ejemplo real:** El ataque a Colonial Pipeline (2021) no fue particularmente sofisticado. El ransomware DarkSide encriptó los sistemas de facturación. Sin embargo, Colonial Pipeline pagó $4.4 millones de rescate porque sus sistemas de backup no estaban aislados y los procesos de recuperación manual habrían tomado semanas, durante las cuales no podrían facturar el combustible.

---

### Plan de Comunicación de Crisis

Un componente crítico del DRP que a menudo se ignora es el plan de comunicación. Durante un desastre, la comunicación clara y oportuna es tan importante como restaurar los servidores.

**Canales de comunicación de emergencia:**
- **Teléfono satelital o radio:** Si la red telefónica y el internet están caídos, los ejecutivos deben tener un canal alternativo.
- **Sistema de notificación masiva:** Herramientas como Everbridge, AlertMedia o PagerDuty que envían SMS, llamadas y correos simultáneamente.
- **Punto de reunión virtual alternativo:** Si Slack/Teams/Correo están caídos, ¿dónde se reúne el equipo de crisis? (Ej: una sala de Signal o WhatsApp pre-acordada).

**Plantillas de comunicación pre-aprobadas:**
- **Comunicado interno (empleados):** "Estimados colaboradores, estamos experimentando una interrupción del servicio. El equipo de TI está trabajando en la restauración. Estimamos restablecer operaciones en X horas. Por favor, no conecten dispositivos personales a la red corporativa."
- **Comunicado externo (clientes):** "Estimado cliente, debido a un incidente técnico, nuestro sistema de [servicio] estará temporalmente fuera de línea. Su data está segura. Recibirá una actualización en [plazo]."
- **Comunicado a prensa (si aplica):** Revisado por el equipo legal antes de cualquier publicación.

### Business Impact Analysis (BIA)

La BIA es el proceso que determina los RTO y RPO para cada sistema. Sin una BIA, el DRP es arbitrario.

**Pasos de una BIA:**
1. **Identificar procesos de negocio críticos:** ¿Qué hace la empresa para ganar dinero? (Ventas, producción, soporte al cliente).
2. **Identificar dependencias tecnológicas:** ¿Qué sistemas soportan cada proceso? (CRM, ERP, base de datos, servidor web).
3. **Determinar impacto financiero de la interrupción:** ¿Cuánto pierde la empresa por hora de inactividad de cada sistema?
4. **Calcular MTD (Maximum Tolerable Downtime):** ¿Cuánto tiempo puede estar el proceso caído antes de que la empresa sufra daño irreparable?
5. **Definir RTO y RPO basados en MTD.**

**Ejemplo de BIA para un e-commerce:**
| Proceso | Sistema | Pérdida/hora | MTD | RTO | RPO |
|---------|---------|-------------|-----|-----|-----|
| Ventas online | Web server + DB | $50,000/hora | 4 horas | 2 horas | 5 min |
| Procesamiento de pagos | Gateway + PCI | $100,000/hora | 2 horas | 1 hora | 1 min |
| Logística y envíos | WMS | $20,000/hora | 8 horas | 4 horas | 1 hora |
| Atención al cliente | CRM + Email | $5,000/hora | 24 horas | 8 horas | 4 horas |
| RRHH | HRIS | $1,000/hora | 48 horas | 24 horas | 24 horas |

### Prueba de DRP: Escenario Detallado

**Ejercicio de Mesa (Tabletop) — Guión para Facilitador:**

*Escenario:* "Son las 2:00 AM del sábado. El centro de datos principal ha sufrido un incendio eléctrico en el rack de servidores. El sistema de extinción de incendios se activó, pero los servidores están destruidos. El centro de datos está en cuarentena por los bomberos. No se puede acceder por 48 horas."

*Preguntas para el equipo:*
1. ¿Quién activa el DRP? ¿Cuál es el proceso de decisión?
2. ¿El DRP actual está accesible? ¿Dónde está guardado?
3. ¿A qué hora estiman que el primer servicio estará disponible?
4. ¿Quién contacta a los clientes? ¿Qué les dice?
5. ¿Los backups están intactos? ¿Dónde están almacenados?
6. ¿Los contactos de emergencia de AWS/Azure están actualizados?

### DRP para Casos Específicos

**DRP para Ransomware:**
1. **Detección:** Alertas de EDR o quejas de usuarios (archivos no se abren, extensiones cambiadas).
2. **Contención inmediata:** Aislar servidores infectados de la red (desconectar cable de red). NO apagar servidores (la evidencia en memoria se pierde).
3. **Notificación:** Contactar al seguro cibernético, al equipo forense externo, a las autoridades (según regulación).
4. **Investigación forense:** Determinar alcance (¿qué datos fueron cifrados? ¿hubo exfiltración?). Identificar vector de entrada.
5. **Erradicación:** Limpiar el malware, cerrar la puerta de entrada (parchear vulnerabilidad, cambiar credenciales).
6. **Restauración:** Restaurar desde backups inmutables. Verificar integridad de datos post-restauración.
7. **Post-mortem:** Documentar lecciones aprendidas, actualizar el DRP.

**DRP para Falla de Cloud Provider:**
1. **Detección:** Monitoreo de disponibilidad muestra que la región us-east-1 de AWS está caída.
2. **Activación:** Iniciar failover a la región secundaria (us-west-2) o al proveedor cloud alternativo.
3. **Verificación:** Confirmar que los datos están replicados y consistentes en la región secundaria.
4. **Redirección de tráfico:** Cambiar DNS (Route53) al nuevo endpoint. TTL bajo (60 segundos) para failover rápido.
5. **Comunicación:** Notificar a clientes sobre degradación del servicio.
6. **Recuperación:** Cuando la región primaria vuelva, sincronizar datos y reverter el tráfico.

---

## 5. Métricas de Continuidad

### MTD (Maximum Tolerable Downtime)

El tiempo máximo que un proceso de negocio puede estar interrumpido antes de causar daño irreparable a la empresa. El MTD es más grande que el RTO. Por ejemplo:
- RTO del sistema de ventas: 2 horas.
- MTD del proceso de ventas: 1 día (la empresa puede sobrevivir 1 día sin vender, pero no más).
- Si el RTO excede el MTD, el DRP falla y la empresa puede quebrar.

### MAO (Maximum Acceptable Outage)

Similar al MTD pero aplicado a la organización completa. Es el tiempo total de inactividad que la empresa puede tolerar antes de la quiebra. Para un banco, el MAO puede ser de 4 horas. Para una tienda de zapatos, de 1 semana.

### SLA vs OLA

- **SLA (Service Level Agreement):** Acuerdo con el cliente externo. "Garantizamos 99.9% de disponibilidad."
- **OLA (Operational Level Agreement):** Acuerdo interno entre equipos. "El equipo de base de datos restaurará en 1 hora."

La diferencia importa porque un SLA ambicioso (99.999% — "cinco nueves") requiere una arquitectura de alta disponibilidad extremadamente costosa, y muchas empresas firman SLAs que su infraestructura no puede cumplir.

---

## 6. Criterio de Dominio (Autoevaluación)

Revisa si puedes liderar el comité de crisis corporativa:

1. El CEO de la empresa ordena que el Plan de Recuperación de Desastres (DRP) se guarde exclusivamente en un documento de Word cifrado en el servidor principal de la empresa, para asegurar su "confidencialidad". Explica el enorme problema lógico de esta decisión si la empresa es víctima de un Ransomware o un apagón total.

2. Explica la diferencia práctica entre un "Backup" (Copia de seguridad) y un "Disaster Recovery Plan (DRP)". ¿Por qué tener un disco duro lleno de datos (Backup) no garantiza que la empresa pueda volver a vender productos mañana en la mañana?

3. Un Banco global que procesa 10,000 transacciones con tarjetas de crédito por segundo decide usar un "Cold Site" como su estrategia de recuperación de desastres para ahorrar dinero en su presupuesto anual. Discute el impacto financiero que tendría esta decisión si el centro de datos principal falla catastróficamente.

4. El equipo técnico redactó un DRP perfecto hace 3 años, pero el mes pasado la empresa cambió toda su arquitectura local hacia la Nube de AWS. Usando la analogía del "Simulacro de Incendio", explica qué pasará la próxima vez que ocurra una emergencia y el equipo intente seguir el DRP de hace 3 años.

5. Un administrador de sistemas ejecuta una prueba de DRP (Simulación) cada 2 años y nunca encuentra problemas porque los sistemas de prueba tienen baja carga. Explica por qué esta prueba es insuficiente y qué tipo de prueba (Full Test) revelaría problemas reales de capacidad y rendimiento.

6. El equipo de ransomware LockBit infecta los servidores de una empresa que tiene backups configurados con la regla 3-2-1, pero el backup fuera de sitio usa el mismo proveedor cloud que la infraestructura principal (AWS). El atacante logra comprometer las credenciales de AWS y borra tanto producción como backups. Explica por qué la regla 3-2-1 del DRP debe incluir también **separación de proveedores** (multicloud) para ser realmente resiliente.
