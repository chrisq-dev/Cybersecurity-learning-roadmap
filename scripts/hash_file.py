#!/usr/bin/env python3
"""Calcula hashes SHA256 de archivos para labs defensivos."""

from hashlib import sha256
from pathlib import Path
import argparse


def sha256_file(path: Path) -> str:
    digest = sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser(description="Calcula SHA256 de un archivo.")
    parser.add_argument("file", help="Ruta del archivo a analizar")
    args = parser.parse_args()

    path = Path(args.file)
    if not path.is_file():
        raise SystemExit(f"No existe el archivo: {path}")

    print(f"{sha256_file(path)}  {path}")


if __name__ == "__main__":
    main()
