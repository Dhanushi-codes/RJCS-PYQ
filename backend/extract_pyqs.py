from pathlib import Path
import json
import re


# ==================================================
# PATHS
# ==================================================

BASE_DIR = Path(__file__).resolve().parent

OCR_DIR = BASE_DIR.parent / "dataset" / "ocr"
OUTPUT_DIR = BASE_DIR.parent / "dataset" / "processed"

OUTPUT_FILE = OUTPUT_DIR / "pyqs_extracted.json"


# ==================================================
# SUBJECT KEYWORDS
# ==================================================

SUBJECT_RULES = {
    "Computer Organization": [
        "computer organization",
        "mainframe",
        "logic gates",
        "boolean",
        "sequential circuit",
        "cisc",
        "instruction fetch",
        "processor memory",
        "register",
        "alu",
        "architecture"
    ],

    "Programming With Python": [
        "programming with python",
        "python",
        "dictionary data type",
        "list function",
        "string functions",
        "append",
        "extend",
        "swapcase",
        "isdigit",
        "prime number",
        "nested if",
        "range function",
        "matrix",
        "palindrome"
    ],

    "Open Source Software": [
        "open source",
        "apache license",
        "gpl license",
        "software freedoms",
        "copyright",
        "trademark",
        "wikipedia",
        "open source methodologies",
        "virtualization",
        "opensource"
    ],

    "Database Management Systems": [
        "dbms",
        "database management",
        "entity relationship",
        "er model",
        "relational",
        "relation schema",
        "data independence",
        "relational algebra",
        "projection",
        "selection",
        "primary key",
        "foreign key"
    ],

    "Data Structures": [
        "data structure",
        "binary tree",
        "binary search tree",
        "breadth first search",
        "depth first search",
        "incidence matrix",
        "graph",
        "vertex",
        "vertices",
        "queue",
        "stack",
        "linked list"
    ],

    "Communication Skills": [
        "communication",
        "non-verbal communication",
        "body language",
        "video conferencing",
        "emotional intelligence",
        "johari",
        "interviews",
        "group discussion",
        "panel discussion",
        "presentation",
        "leadership",
        "decision making"
    ],

    "Statistics": [
        "statistics",
        "correlation coefficient",
        "regression",
        "regression equations",
        "raw moments",
        "probability",
        "conditional probability",
        "independent events",
        "mutually exclusive",
        "bayes",
        "distribution"
    ],

    "Mathematics": [
        "relation on z",
        "fibonacci sequence",
        "one-one and onto",
        "combinatorial",
        "arrangements",
        "permutation",
        "combination",
        "set theory",
        "function",
        "inverse function"
    ]
}


# ==================================================
# SUBJECT DETECTION
# ==================================================

def detect_subject(text, current_subject=None):

    text_lower = text.lower()

    scores = {}

    for subject, keywords in SUBJECT_RULES.items():

        score = 0

        for keyword in keywords:

            if keyword in text_lower:
                score += 1

        scores[subject] = score

    best_subject = max(
        scores,
        key=scores.get
    )

    best_score = scores[best_subject]

    # Strong evidence -> change subject
    if best_score >= 2:
        return best_subject

    # One very strong title keyword
    strong_titles = [
        "programming with python",
        "open source",
        "computer organization",
        "database management",
        "non-verbal communication"
    ]

    for title in strong_titles:

        if title in text_lower:

            for subject, keywords in SUBJECT_RULES.items():

                if title in keywords:

                    return subject

    # Otherwise continue previous subject
    return current_subject or "Unknown"


# ==================================================
# SUBJECT CODE
# ==================================================

def detect_subject_code(text):

    patterns = [
        r"\b[A-Z]{2,10}\d{3,5}\b",
        r"\b[A-Z]{2,10}[-/]\d{3,5}\b"
    ]

    for pattern in patterns:

        match = re.search(
            pattern,
            text.upper()
        )

        if match:
            return match.group(0)

    return None


# ==================================================
# YEAR / SEMESTER
# ==================================================

def detect_year_semester(file_path):

    path_text = str(file_path)
    upper = path_text.upper()

    year_match = re.search(
        r"(20\d{2})[-_](\d{2})",
        path_text
    )

    academic_year = None

    if year_match:

        academic_year = (
            f"{year_match.group(1)}-"
            f"{year_match.group(2)}"
        )

    if "FYBSC" in upper:
        year = "FY"
    elif "SYBSC" in upper:
        year = "SY"
    elif "TYBSC" in upper:
        year = "TY"
    else:
        year = None

    semester = None

    match = re.search(
        r"SEM(?:ESTER)?\s*([1-6])",
        upper
    )

    if match:
        semester = int(
            match.group(1)
        )

    if "SEM1&2" in upper:
        semester = "1-2"

    return year, semester, academic_year


# ==================================================
# CLEAN LINE
# ==================================================

def clean_line(line):

    line = line.strip()

    if not line:
        return ""

    line = re.sub(
        r"[\x00-\x1f\x7f]",
        "",
        line
    )

    line = re.sub(
        r"\s+",
        " ",
        line
    )

    return line.strip()


# ==================================================
# SECTION / METADATA
# ==================================================

def is_section_marker(line):

    lower = line.lower()

    markers = [
        "attempt the following",
        "attempt any",
        "all questions are compulsory",
        "each question carries",
        "semester end examination",
        "examination",
        "maximum marks",
        "marks:",
        "date:",
        "day:",
        "time:"
    ]

    return any(
        marker in lower
        for marker in markers
    )


# ==================================================
# QUESTION START
# ==================================================

def is_question_start(line):

    if not line:
        return False

    lower = line.lower()

    starts = [
        "explain ",
        "describe ",
        "discuss ",
        "write ",
        "define ",
        "differentiate ",
        "distinguish ",
        "calculate ",
        "find ",
        "prove ",
        "derive ",
        "simplify ",
        "convert ",
        "what is ",
        "how ",
        "why ",
        "give ",
        "state ",
        "list ",
        "illustrate ",
        "draw ",
        "develop ",
        "design ",
        "implement ",
        "program ",
        "mention ",
        "show ",
        "solve "
    ]

    if any(
        lower.startswith(start)
        for start in starts
    ):
        return True

    # Numbered question
    if re.match(
        r"^(?:q(?:uestion)?\.?\s*)?\d+[\.\):\-]\s*",
        lower
    ):
        return True

    # Lettered question
    if re.match(
        r"^[a-z][\.\):\-]\s+",
        lower
    ):
        return True

    # Direct question
    if "?" in line:
        return True

    return False


# ==================================================
# EXTRACT QUESTIONS FROM ONE PAGE
# ==================================================

def extract_questions(page_text):

    lines = [
        clean_line(line)
        for line in page_text.splitlines()
    ]

    lines = [
        line for line in lines
        if line
    ]

    questions = []

    current = []

    def flush():

        nonlocal current

        if not current:
            return

        question = " ".join(current)

        question = re.sub(
            r"\s+",
            " ",
            question
        ).strip()

        # Avoid tiny/noisy records
        if len(question) >= 20:

            questions.append(
                question
            )

        current = []

    for line in lines:

        # Metadata / section heading
        if is_section_marker(line):

            flush()

            continue

        # New question
        if is_question_start(line):

            flush()

            current = [line]

            continue

        # Continuation of current question
        if current:

            # Don't allow huge garbage blocks
            if len(
                " ".join(current)
            ) < 400:

                current.append(line)

    flush()

    return questions


# ==================================================
# PROCESS OCR FILE
# ==================================================

def process_file(txt_file):

    text = txt_file.read_text(
        encoding="utf-8",
        errors="ignore"
    )

    year, semester, academic_year = (
        detect_year_semester(txt_file)
    )

    records = []

    pages = re.split(
        r"===== PAGE\s+\d+\s+=====",
        text,
        flags=re.IGNORECASE
    )

    current_subject = "Unknown"
    current_subject_code = None

    for page_number, page_text in enumerate(
        pages,
        start=1
    ):

        if not page_text.strip():
            continue

        # ------------------------------------------
        # Detect subject from THIS page
        # ------------------------------------------

        detected_subject = detect_subject(
            page_text,
            current_subject
        )

        if detected_subject != "Unknown":

            current_subject = detected_subject

        detected_code = detect_subject_code(
            page_text
        )

        if detected_code:

            current_subject_code = detected_code

        # ------------------------------------------
        # Extract questions
        # ------------------------------------------

        questions = extract_questions(
            page_text
        )

        for question in questions:

            records.append(
                {
                    "year": year,
                    "semester": semester,
                    "academic_year": academic_year,
                    "subject": current_subject,
                    "subject_code": current_subject_code,
                    "question": question,
                    "source_file": txt_file.name,
                    "source_path": str(
                        txt_file.relative_to(
                            OCR_DIR
                        )
                    ),
                    "page": page_number
                }
            )

    return records


# ==================================================
# MAIN
# ==================================================

def main():

    print(
        "\n================================"
    )

    print(
        "RJCS-PYQ EXTRACTION ENGINE"
    )

    print(
        "================================\n"
    )

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    txt_files = sorted(
        OCR_DIR.rglob("*.txt")
    )

    print(
        f"Found {len(txt_files)} OCR files.\n"
    )

    all_records = []

    for index, txt_file in enumerate(
        txt_files,
        start=1
    ):

        try:

            records = process_file(
                txt_file
            )

            all_records.extend(
                records
            )

            print(
                f"[{index}/{len(txt_files)}] "
                f"{txt_file.name} -> "
                f"{len(records)} questions"
            )

        except Exception as error:

            print(
                f"[ERROR] {txt_file.name}: "
                f"{error}"
            )

    # ----------------------------------------------
    # SAVE
    # ----------------------------------------------

    with open(
        OUTPUT_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            all_records,
            file,
            indent=4,
            ensure_ascii=False
        )

    # ----------------------------------------------
    # SUBJECT SUMMARY
    # ----------------------------------------------

    subject_counts = {}

    for record in all_records:

        subject = record["subject"]

        subject_counts[subject] = (
            subject_counts.get(
                subject,
                0
            ) + 1
        )

    print(
        "\n================================"
    )

    print(
        "EXTRACTION COMPLETED"
    )

    print(
        f"TOTAL QUESTIONS: "
        f"{len(all_records)}"
    )

    print(
        "\nSUBJECT COUNTS:"
    )

    for subject, count in sorted(
        subject_counts.items()
    ):

        print(
            f"  {subject}: {count}"
        )

    print(
        f"\nSaved to:"
        f"\n{OUTPUT_FILE}"
    )

    print(
        "================================\n"
    )


if __name__ == "__main__":
    main()