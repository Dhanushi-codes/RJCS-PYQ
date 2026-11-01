import os
import sys
from pathlib import Path
from typing import List, Optional

import pymupdf
from google import genai
from google.genai import types
from pydantic import BaseModel, Field


# ---------------------------------------------------------
# 1. Pydantic Schemas for Structured JSON Output
# ---------------------------------------------------------
class QuestionItem(BaseModel):
    section: str = Field(description="e.g. 'Q.1', 'Q.2'")
    sub_label: str = Field(description="e.g. 'A', 'B', '1'")
    question_text: str = Field(description="Full text of the question, with all tags preserved")
    marks: Optional[int] = Field(default=5, description="Marks for this specific question if known or calculable")
    topic: Optional[str] = Field(default=None, description="Topic tag, e.g. 'HTML', 'JavaScript', 'CSS', 'PHP', 'AJAX', 'XML'")

class ExamPaper(BaseModel):
    college_name: str
    subject_name: str
    subject_code: Optional[str]
    semester: str
    syllabus_version: str
    exam_date: Optional[str]
    max_marks: Optional[int]
    questions: List[QuestionItem]

# ---------------------------------------------------------
# 2. Client Initialization (Shell-Exported Keys)
# ---------------------------------------------------------
api_key = os.getenv("GEMINI_API_KEY") or os.getenv("gemini_generative_ai_api_key")

if not api_key:
    raise ValueError(
        "API key not found in shell environment. "
        "Ensure GEMINI_API_KEY or gemini_generative_ai_api_key is exported."
    )

client = genai.Client(api_key=api_key)

# ---------------------------------------------------------
# 3. Core Extraction Function
# ---------------------------------------------------------
def extract_paper_as_json(pdf_path: str, page_number: int = 4) -> ExamPaper:
    path = Path(pdf_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {pdf_path}")

    doc = pymupdf.open(str(path))
    if page_number > len(doc) or page_number < 1:
        raise IndexError(f"Page number {page_number} is out of bounds for PDF with {len(doc)} pages.")

    # PyMuPDF is 0-indexed
    page = doc[page_number - 1]
    pix = page.get_pixmap(dpi=200)
    img_bytes = pix.tobytes("png")

    prompt = """
You are an expert exam paper digitizer for university Computer Science exams.
Extract the metadata and all individual questions from this exam paper page into the exact requested JSON schema.

Guidelines:
- Each question and sub-part must be a separate entry in the questions list.
- For choice questions (e.g., 'Attempt any Three' for 15 marks total), each sub-question carries 5 marks.
- Fill in the blanks (Q.4) should each be a distinct QuestionItem with marks=1.
- Accurately tag the topic ('HTML', 'JavaScript', 'CSS', 'PHP', 'AJAX', 'XML').
- De-interleave parallel or side-by-side columns cleanly.
- Preserve all tags and symbols verbatim (e.g. <textarea>, <xsl-value-of>, <img>).
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            types.Part.from_bytes(data=img_bytes, mime_type="image/png"),
            prompt
        ],
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=ExamPaper,
            temperature=0.0
        )
    )

    return ExamPaper.model_validate_json(response.text)

# ---------------------------------------------------------
# 4. Standalone CLI Runner
# ---------------------------------------------------------
if __name__ == "__main__":
    target_pdf = sys.argv[1] if len(sys.argv) > 1 else "data/raw_papers/SYBSC_2025_26.pdf"
    target_page = int(sys.argv[2]) if len(sys.argv) > 2 else 4

    paper = extract_paper_as_json(target_pdf, page_number=target_page)

    print(f"\n{'='*25} EXTRACTION RESULT {'='*25}")
    print(f"College : {paper.college_name}")
    print(f"Subject : {paper.subject_name} ({paper.subject_code})")
    print(f"Session : Semester {paper.semester} | Date: {paper.exam_date} | Max Marks: {paper.max_marks}")
    print(f"Total Questions Extracted: {len(paper.questions)}\n")

    for q in paper.questions:
        print(f"[{q.section} - {q.sub_label}] [{q.marks}M] ({q.topic}): {q.question_text}")