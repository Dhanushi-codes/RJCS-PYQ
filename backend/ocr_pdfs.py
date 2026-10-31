from pathlib import Path
import re

import fitz
import pytesseract
from PIL import Image


# --------------------------------------------------
# PATHS
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent

RAW_DIR = BASE_DIR.parent / "dataset" / "raw"
OCR_DIR = BASE_DIR.parent / "dataset" / "ocr"


# --------------------------------------------------
# TESSERACT
# --------------------------------------------------

TESSERACT_PATH = Path(
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

if TESSERACT_PATH.exists():
    pytesseract.pytesseract.tesseract_cmd = str(
        TESSERACT_PATH
    )


# --------------------------------------------------
# CLEAN OCR TEXT
# --------------------------------------------------

def clean_text(text):

    text = text.replace("\x0c", "")

    # Normalize excessive spaces
    text = re.sub(
        r"[ \t]+",
        " ",
        text
    )

    # Remove excessive blank lines
    text = re.sub(
        r"\n{3,}",
        "\n\n",
        text
    )

    return text.strip()


# --------------------------------------------------
# OCR ONE PDF
# --------------------------------------------------

def ocr_pdf(pdf_path):

    relative_path = pdf_path.relative_to(
        RAW_DIR
    )

    output_path = (
        OCR_DIR /
        relative_path.with_suffix(".txt")
    )

    output_path.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    # Don't OCR again if already processed
    if output_path.exists():

        print(
            f"[exists] {relative_path}"
        )

        return

    print(
        f"\nOCR: {relative_path}"
    )

    document = fitz.open(
        pdf_path
    )

    all_text = []

    total_pages = len(document)

    for page_number, page in enumerate(
        document,
        start=1
    ):

        print(
            f"   Page {page_number}/{total_pages}",
            end="\r"
        )

        # Render PDF page as image
        matrix = fitz.Matrix(
            2.0,
            2.0
        )

        pixmap = page.get_pixmap(
            matrix=matrix,
            alpha=False
        )

        image = Image.frombytes(
            "RGB",
            [
                pixmap.width,
                pixmap.height
            ],
            pixmap.samples
        )

        # OCR
        text = pytesseract.image_to_string(
            image,
            lang="eng"
        )

        all_text.append(
            f"\n\n===== PAGE {page_number} =====\n\n"
            f"{text}"
        )

    document.close()

    final_text = clean_text(
        "\n".join(all_text)
    )

    output_path.write_text(
        final_text,
        encoding="utf-8"
    )

    print(
        f"\n   ✓ Saved: {output_path}"
    )


# --------------------------------------------------
# MAIN
# --------------------------------------------------

def main():

    print("\n================================")
    print("RJCS-PYQ OCR PROCESSOR")
    print("================================\n")

    if not RAW_DIR.exists():

        print(
            f"ERROR: Raw PDF directory not found:\n"
            f"{RAW_DIR}"
        )

        return

    OCR_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    pdf_files = sorted(
        RAW_DIR.rglob("*.pdf")
    )

    print(
        f"Found {len(pdf_files)} PDF files.\n"
    )

    if not pdf_files:

        print(
            "No PDFs found."
        )

        return

    successful = 0
    failed = 0

    for pdf_path in pdf_files:

        try:

            ocr_pdf(
                pdf_path
            )

            successful += 1

        except Exception as error:

            failed += 1

            print(
                f"\nERROR processing:"
                f"\n{pdf_path}"
            )

            print(
                f"Reason: {error}"
            )

    print(
        "\n================================"
    )

    print(
        "OCR COMPLETED"
    )

    print(
        f"Successful: {successful}"
    )

    print(
        f"Failed: {failed}"
    )

    print(
        f"\nOCR files saved in:"
        f"\n{OCR_DIR}"
    )

    print(
        "================================\n"
    )


if __name__ == "__main__":
    main()