
import sqlite3
from pathlib import Path
from typing import Any, Dict, List, Optional

from pymupdf.mupdf import EOF
from src.ocr.engine import ExamPaper

DB_DIR = Path("data/database")
DB_PATH = DB_DIR / "papers.db"


def init_db(db_path: Path = DB_PATH) -> None:
    """Initializes SQLite database and tables if they do not exist."""
    db_path.parent.mkdir(parents=True, exist_ok=True)

    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()

        # Papers metadata table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS papers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                college_name TEXT,
                subject_name TEXT NOT NULL,
                subject_code TEXT,
                semester TEXT,
                syllabus_version TEXT,
                exam_date TEXT,
                max_marks INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(subject_code, exam_date)
            )
        """)

        # Questions table with cached answer column
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                paper_id INTEGER NOT NULL,
                section TEXT NOT NULL,
                sub_label TEXT NOT NULL,
                question_text TEXT NOT NULL,
                marks INTEGER,
                topic TEXT,
                cached_answer TEXT,
                FOREIGN KEY (paper_id) REFERENCES papers (id) ON DELETE CASCADE,
                UNIQUE(paper_id, section, sub_label)
            )
        """)

        # Topic lookup index
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_questions_topic 
            ON questions (topic)
        """)

        conn.commit()


def save_exam_paper(paper: ExamPaper, db_path: Path = DB_PATH) -> int:
    """Saves or updates an ExamPaper and its questions in SQLite."""
    init_db(db_path)

    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()

        # 1. Insert or update paper metadata
        cursor.execute("""
            INSERT INTO papers (
                college_name, subject_name, subject_code, 
                semester, syllabus_version, exam_date, max_marks
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(subject_code, exam_date) DO UPDATE SET
                college_name=excluded.college_name,
                subject_name=excluded.subject_name,
                max_marks=excluded.max_marks
            RETURNING id
        """, (
            paper.college_name, paper.subject_name, paper.subject_code,
            paper.semester, paper.syllabus_version, paper.exam_date, paper.max_marks
        ))

        row = cursor.fetchone()
        if row:
            paper_id = row[0]
        else:
            cursor.execute(
                "SELECT id FROM papers WHERE subject_code = ? AND exam_date = ?",
                (paper.subject_code, paper.exam_date)
            )
            paper_id = cursor.fetchone()[0]

        # 2. Upsert each question
        for q in paper.questions:
            cursor.execute("""
                INSERT INTO questions (
                    paper_id, section, sub_label, question_text, marks, topic
                ) VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(paper_id, section, sub_label) DO UPDATE SET
                    question_text=excluded.question_text,
                    marks=excluded.marks,
                    topic=excluded.topic
            """, (
                paper_id, q.section, q.sub_label, q.question_text, q.marks, q.topic
            ))

        conn.commit()
        return paper_id


def get_questions_by_topic(topic: str, db_path: Path = DB_PATH) -> List[Dict[str, Any]]:
    """Fetches questions matching a topic keyword."""
    with sqlite3.connect(db_path) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        cursor.execute("""
            SELECT q.id, q.section, q.sub_label, q.question_text, q.marks, q.topic, 
                   q.cached_answer, p.subject_name, p.exam_date
            FROM questions q
            JOIN papers p ON q.paper_id = p.id
            WHERE q.topic LIKE ?
            ORDER BY q.marks DESC
        """, (f"%{topic}%",))

        return [dict(r) for r in cursor.fetchall()]


if __name__ == "__main__":
    from src.ocr.engine import extract_paper_as_json

    print("[*] Ingesting Page 4 via engine...")
    paper_data = extract_paper_as_json("data/raw_papers/SYBSC_2025_26.pdf", page_number=4)

    pid = save_exam_paper(paper_data)
    print(f"[+] Stored Paper ID: {pid}")

    print("\n[*] Querying topic: 'JavaScript'...")
    results = get_questions_by_topic("JavaScript")
    for q in results:
        print(f"- [{q['section']} - {q['sub_label']}] ({q['marks']}M): {q['question_text']}")