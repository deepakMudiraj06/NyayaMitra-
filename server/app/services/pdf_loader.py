import fitz  # PyMuPDF
import os


def extract_pdf_text(pdf_path):
    """
    Extract all text from a PDF.
    """

    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    document = fitz.open(pdf_path)

    full_text = ""

    for page_number, page in enumerate(document):
        text = page.get_text()

        full_text += (
            f"\n\n========== PAGE {page_number + 1} ==========\n\n"
        )

        full_text += text

    document.close()

    return full_text