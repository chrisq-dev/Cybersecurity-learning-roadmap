# Scripts

Herramientas pequenas y automatizaciones creadas durante el aprendizaje.

Los scripts deben ser seguros, documentados y pensados para laboratorios autorizados, analisis defensivo o aprendizaje.

## Ideas

- Parsers de logs.
- Calculadoras de hashes.
- Utilidades de red para laboratorios.
- Generadores de reportes.
- Ayudantes para analizar archivos.
- Ayudantes para reglas Sigma o YARA.

## Scripts Incluidos

- `hash_file.py` - Calcula SHA256 de un archivo.
- `auth_log_summary.py` - Resume logs ficticios de autenticacion y genera reporte Markdown.
- `asset_inventory_check.py` - Revisa un CSV de activos y reporta campos faltantes.

## Uso

```bash
python3 scripts/hash_file.py archivo.txt
python3 scripts/auth_log_summary.py labs/data/auth.log --report labs/reportes/auth-report.md
python3 scripts/asset_inventory_check.py labs/data/assets.csv --report labs/reportes/asset-report.md
```

Usa datos ficticios o de laboratorio. No subas logs reales con informacion sensible.
