from pathlib import Path
import json

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import os
from google import genai
from pydantic import BaseModel

# ==================================================
# PATHS
# ==================================================

BASE_DIR = Path(__file__).resolve().parent

DATA_FILE = BASE_DIR.parent / "dataset" / "processed" / "all_pyqs_normalized.json"


# ==================================================
# LOAD DATA
# ==================================================

def load_data():

    if not DATA_FILE.exists():

        print(
            f"Dataset not found: {DATA_FILE}"
        )

        return []

    with open(
        DATA_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        return json.load(file)


PYQS = load_data()


# ==================================================
# FASTAPI
# ==================================================

app = FastAPI(
    title="RJCS-PYQ API",
    version="1.0.0"
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY is not set.")




class AnswerRequest(BaseModel):
    question: str
    marks: float | None = None
# ==================================================
# CORS
# ==================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================================================
# HOME
# ==================================================

@app.get("/")
def home():

    return {
        "message": "RJCS-PYQ API is running",
        "total_records": len(PYQS)
    }


# ==================================================
# STATS
# ==================================================

@app.get("/api/stats")
def stats():

    subjects = {}

    for item in PYQS:

        subject = item.get(
            "subject",
            "Unknown"
        )

        subjects[subject] = (
            subjects.get(subject, 0) + 1
        )

    return {
        "total_records": len(PYQS),
        "subjects": subjects
    }


# ==================================================
# SUBJECTS
# ==================================================

@app.get("/api/subjects")
def get_subjects(
    year: str | None = None,
    semester: str | None = None
):

    subjects = set()

    for item in PYQS:

        if year and item.get("year") != year:
            continue

        if semester:

            item_semester = str(
                item.get("semester")
            )

            if item_semester != str(semester):
                continue

        subject = item.get(
            "subject"
        )

        if subject and subject != "Unknown":

            subjects.add(subject)

    return sorted(subjects)


# ==================================================
# PYQ SEARCH
# ==================================================

@app.get("/api/pyqs")
def search_pyqs(
    year: str | None = None,
    semester: str | None = None,
    subject: str | None = None,
    topic: str | None = None,
    limit: int = Query(
        default=3,
        le=500
    )
):

    # ==================================================
    # FILTER BY YEAR / SEMESTER / SUBJECT
    # ==================================================

    filtered = []

    for item in PYQS:

        if year and item.get("year") != year:
            continue

        if semester:

            if str(
                item.get("semester")
            ) != str(semester):

                continue

        if subject:

            if item.get("subject") != subject:
                continue

        filtered.append(item)


    # ==================================================
    # IF NO TOPIC
    # ==================================================

    if not topic:

        return {
            "count": min(len(filtered), limit),
            "results": filtered[:limit]
        }


    # ==================================================
    # SEARCH TOPIC
    # ==================================================

    query_words = [
        word.lower()
        for word in topic.split()
        if len(word.strip()) >= 2
    ]


    # ==================================================
    # SCORE QUESTIONS
    # ==================================================

    scored_results = []

    for item in filtered:

        question = item.get(
            "question",
            ""
        )

        question_lower = question.lower()

        score = 0


                # Exact topic match
        if topic.lower() in question_lower:
            score += 100

        # Individual word matches
        for word in query_words:
            if word in question_lower:
                score += 10

        # Also match the topic against the subject
        if topic.lower() in item.get("subject", "").lower():
            score += 20

        if score > 0:

            scored_results.append(
                (score, item)
            )


    # ==================================================
    # SORT BY RELEVANCE
    # ==================================================

    scored_results.sort(
        key=lambda x: x[0],
        reverse=True
    )


    # ==================================================
    # RETURN TOP RESULTS
    # ==================================================

    results = [
        item
        for score, item in scored_results[:limit]
    ]


    return {
        "count": len(results),
        "results": results
    }


# ==================================================
# SINGLE PYQ
# ==================================================

@app.get("/api/pyqs/{pyq_id}")
def get_pyq(pyq_id: int):

    if pyq_id < 0 or pyq_id >= len(PYQS):

        return {
            "error": "PYQ not found"
        }

    return PYQS[pyq_id]


# ==================================================
# RELOAD DATA
# ==================================================

@app.post("/api/reload")
def reload_data():

    global PYQS

    PYQS = load_data()

    return {
        "message": "Dataset reloaded",
        "total_records": len(PYQS)
    }

@app.post("/api/generate-answer")
def generate_answer(request: AnswerRequest):

    marks = request.marks or 5

    prompt = f"""
You are an exam-answer assistant for an undergraduate Computer Science student.

Answer the following actual previous-year exam question.

Question:
{request.question}

Marks: {marks}

Instructions:
- Write an exam-oriented answer.
- Match the depth of the answer to the marks.
- For 3 marks, keep it concise.
- For 5 marks, give a clear explanation with important points.
- For 10 marks, give a detailed structured answer with examples where useful.
- Use headings and bullet points when appropriate.
- Do not mention that you are an AI.
- Do not invent details unrelated to the question.
- Make the answer easy for a student to study and reproduce in an exam.
"""

    try:
        gemini_client = genai.Client(api_key=GEMINI_API_KEY)

        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return {
            "answer": response.text
        }

    except Exception as e:
        print("Gemini error:", repr(e))
        raise HTTPException(
        status_code=500,
        detail=str(e)
    )