#!/usr/bin/env python3
"""Revisa un CSV ficticio de activos y reporta campos faltantes."""

from pathlib import Path
import argparse
import csv


REQUIRED_FIELDS = ("hostname", "owner", "criticality")


def main() -> None:
    parser = argparse.ArgumentParser(description="Revisa inventario CSV de activos.")
    parser.add_argument("csvfile", help="CSV con columnas hostname, owner, criticality")
    parser.add_argument("--report", default="asset-report.md", help="Ruta del reporte Markdown")
    args = parser.parse_args()

    path = Path(args.csvfile)
    if not path.is_file():
        raise SystemExit(f"No existe el archivo: {path}")

    findings: list[str] = []
    with path.open(newline="") as file:
        reader = csv.DictReader(file)
        missing = [field for field in REQUIRED_FIELDS if field not in (reader.fieldnames or [])]
        if missing:
            raise SystemExit(f"Faltan columnas requeridas: {', '.join(missing)}")

        for row in reader:
            hostname = row.get("hostname", "unknown") or "unknown"
            for field in REQUIRED_FIELDS:
                if not row.get(field):
                    findings.append(f"- {hostname}: falta `{field}`")

    report = ["# Reporte de Inventario", ""]
    if findings:
        report.append("## Hallazgos")
        report.extend(findings)
    else:
        report.append("No se encontraron campos faltantes.")
    report.append("")
    report.append("## Recomendacion")
    report.append("Mantener owner y criticidad para priorizar riesgos e incidentes.")

    Path(args.report).write_text("\n".join(report) + "\n")
    print(f"Reporte generado: {args.report}")


if __name__ == "__main__":
    main()
