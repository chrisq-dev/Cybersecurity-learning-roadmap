#!/usr/bin/env python3
"""Resume logs ficticios de autenticacion para practicar Blue Team.

Formato esperado por linea:
2026-06-23T10:00:01 user=admin src_ip=203.0.113.10 result=failed
"""

from collections import Counter
from pathlib import Path
import argparse


def parse_fields(line: str) -> dict[str, str]:
    fields: dict[str, str] = {}
    for part in line.split():
        if "=" in part:
            key, value = part.split("=", 1)
            fields[key] = value
    return fields


def main() -> None:
    parser = argparse.ArgumentParser(description="Resume eventos de autenticacion ficticios.")
    parser.add_argument("logfile", help="Archivo de log a analizar")
    parser.add_argument("--report", default="auth-report.md", help="Ruta del reporte Markdown")
    args = parser.parse_args()

    path = Path(args.logfile)
    if not path.is_file():
        raise SystemExit(f"No existe el archivo: {path}")

    failed_by_user: Counter[str] = Counter()
    failed_by_ip: Counter[str] = Counter()
    total_failed = 0

    for line in path.read_text().splitlines():
        fields = parse_fields(line)
        if fields.get("result") == "failed":
            total_failed += 1
            failed_by_user[fields.get("user", "unknown")] += 1
            failed_by_ip[fields.get("src_ip", "unknown")] += 1

    report = ["# Reporte de Autenticacion", ""]
    report.append(f"Total de logins fallidos: {total_failed}")
    report.append("")
    report.append("## Fallos por Usuario")
    for user, count in failed_by_user.most_common():
        report.append(f"- {user}: {count}")
    report.append("")
    report.append("## Fallos por IP")
    for ip, count in failed_by_ip.most_common():
        report.append(f"- {ip}: {count}")
    report.append("")
    report.append("## Siguientes Pasos")
    report.append("- Revisar si hubo login exitoso posterior.")
    report.append("- Validar si la IP es esperada.")
    report.append("- Considerar reset de credenciales o MFA si aplica.")

    Path(args.report).write_text("\n".join(report) + "\n")
    print(f"Reporte generado: {args.report}")


if __name__ == "__main__":
    main()
