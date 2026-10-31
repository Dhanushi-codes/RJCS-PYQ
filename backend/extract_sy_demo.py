from pathlib import Path
import json
import re


BASE_DIR = Path(r"G:\RJCS-PYQ")

OCR_DIRS = [
    BASE_DIR / "dataset" / "ocr" / "SYBSc 2022-23",
    BASE_DIR / "dataset" / "ocr" / "SYBSc 2023-24",
    BASE_DIR / "dataset" / "ocr" / "SYBSc 2024-25",
    BASE_DIR / "dataset" / "ocr" / "SYBSC 2025-26",
]

OUTPUT_FILE = (
    BASE_DIR
    / "dataset"
    / "processed"
    / "sy_pyqs_demo.json"
)


SUBJECT_KEYWORDS = {

    "Web Programming": [
        "html",
        "css",
        "javascript",
        "php",
        "web programming",
        "web page",
        "form",
        "dom",
        "xml",
        "ajax",
        "bootstrap",
        "session",
        "cookie"
    ],

    "Java": [
        "java",
        "jdk",
        "jvm",
        "jre",
        "class",
        "object",
        "inheritance",
        "polymorphism",
        "encapsulation",
        "constructor",
        "interface",
        "exception handling",
        "multithreading",
        "awt",
        "swing"
    ],

    "Combinatorics & Graph Theory": [
        "graph theory",
        "combinatorics",
        "permutation",
        "combination",
        "graph",
        "vertex",
        "vertices",
        "edge",
        "edges",
        "tree",
        "bipartite",
        "hamiltonian",
        "eulerian",
        "degree",
        "relation",
        "recurrence"
    ],

    "Personal Finance": [
        "personal finance",
        "investment",
        "saving",
        "budget",
        "financial planning",
        "financial goal",
        "mutual fund",
        "portfolio",
        "diversification",
        "retirement",
        "fire",
        "4% rule",
        "insurance",
        "tax"
    ],

    "Linear Algebra": [
        "linear algebra",
        "matrix",
        "matrices",
        "determinant",
        "eigenvalue",
        "eigenvector",
        "vector space",
        "linear transformation",
        "rank",
        "inverse matrix",
        "system of equations"
    ],

    "Advanced Java": [
        "advanced java",
        "servlet",
        "jsp",
        "jdbc",
        "hibernate",
        "spring",
        "session bean",
        "enterprise java",
        "java bean",
        "web container"
    ],

    "Principles of Marketing": [
        "marketing",
        "marketing mix",
        "4p",
        "4ps",
        "consumer behavior",
        "market segmentation",
        "target market",
        "branding",
        "promotion",
        "product life cycle",
        "market research"
    ],

    "Physical Computing & IoT": [
        "physical computing",
        "iot",
        "internet of things",
        "arduino",
        "raspberry pi",
        "sensor",
        "actuator",
        "microcontroller",
        "embedded",
        "gpio",
        "mqtt",
        "esp32"
    ],

    "Fundamentals of Photography": [
        "photography",
        "camera",
        "aperture",
        "shutter speed",
        "iso",
        "exposure",
        "lens",
        "composition",
        "depth of field",
        "white balance",
        "rule of thirds",
        "photograph"
    ],

    "Fundamentals of Entrepreneurship": [
        "entrepreneurship",
        "entrepreneur",
        "startup",
        "business plan",
        "innovation",
        "venture",
        "entrepreneurial",
        "business model",
        "risk",
        "funding",
        "startup ecosystem"
    ],
}


def detect_semester(filename, text):

    combined = (
        filename.lower()
        + " "
        + text[:5000].lower()
    )

    if re.search(r"\bsem(?:ester)?[\s._-]*3\b", combined):
        return 3

    if re.search(r"\bsem(?:ester)?[\s._-]*4\b", combined):
        return 4

    if "sem iii" in combined:
        return 3

    if "sem iv" in combined:
        return 4

    return None


def detect_subject(text, filename=""):

    combined = (
        filename.lower()
        + " "
        + text.lower()
    )

    scores = {}

    for subject, keywords in SUBJECT_KEYWORDS.items():

        score = 0

        for keyword in keywords:

            occurrences = combined.count(
                keyword.lower()
            )

            score += occurrences

        scores[subject] = score

    best_subject = max(
        scores,
        key=scores.get
    )

    best_score = scores[best_subject]

    if best_score == 0:
        return "Unknown"

    return best_subject


def clean_question(text):

    text = text.replace("\x0c", " ")

    text = re.sub(
        r"\s+",
        " ",
        text
    )

    text = re.sub(
        r"\s+([,.;:?)])",
        r"\1",
        text
    )

    text = re.sub(
        r"([(\[])\s+",
        r"\1",
        text
    )

    return text.strip()


def split_questions(text):

    text = text.replace("\r", "\n")

    # Normalize common OCR question formats.
    text = re.sub(
        r"\bQ\s*\.\s*(\d+)",
        r"\nQUESTION \1 ",
        text,
        flags=re.IGNORECASE
    )

    text = re.sub(
        r"\bQ\s*(\d+)",
        r"\nQUESTION \1 ",
        text,
        flags=re.IGNORECASE
    )

    text = re.sub(
        r"\bQ\.\s*(\d+)",
        r"\nQUESTION \1 ",
        text,
        flags=re.IGNORECASE
    )

    text = re.sub(
        r"(?m)^\s*(\d+)\s*[\.)]\s+",
        r"\nQUESTION \1 ",
        text
    )

    text = re.sub(
        r"(?m)^\s*([a-zA-Z])\s*[\.)]\s+",
        r"\nQUESTION \1 ",
        text
    )

    parts = re.split(
        r"\nQUESTION\s+[\w]+",
        text,
        flags=re.IGNORECASE
    )

    questions = []

    for part in parts:

        part = clean_question(part)

        if len(part) < 25:
            continue

        # Remove obvious paper metadata.
        if re.search(
            r"^(time|marks|maximum marks|semester|seat no|date)",
            part,
            re.IGNORECASE
        ):
            continue

        questions.append(part)

    return questions


def extract_from_file(file_path):

    try:

        text = file_path.read_text(
            encoding="utf-8",
            errors="ignore"
        )

    except Exception as error:

        print(
            f"ERROR reading {file_path.name}: {error}"
        )

        return []

    semester = detect_semester(
        file_path.name,
        text
    )

    if semester not in [3, 4]:
        return []

    subject = detect_subject(
        text,
        file_path.name
    )

    questions = split_questions(text)

    records = []

    academic_year = "Unknown"

    match = re.search(
        r"(20\d{2})[-_](\d{2,4})",
        file_path.name
    )

    if match:

        academic_year = (
            f"{match.group(1)}-{match.group(2)}"
        )

    for question in questions:

        # Skip obvious non-question junk.
        lower = question.lower()

        if len(question) < 30:
            continue

        if (
            "question paper" in lower
            and len(question) < 100
        ):
            continue

        records.append({
            "year": "SY",
            "semester": semester,
            "academic_year": academic_year,
            "subject": subject,
            "question": question,
            "source_file": file_path.name,
        })

    return records


def main():

    print()
    print("=" * 60)
    print("RJCS-PYQ SY DEMO EXTRACTION - PANIC MODE")
    print("=" * 60)
    print()

    files = []

    for folder in OCR_DIRS:

        if not folder.exists():
            continue

        files.extend(
            folder.glob("*.txt")
        )

    print(
        f"Found {len(files)} OCR files."
    )
    print()

    all_records = []

    for index, file_path in enumerate(
        files,
        start=1
    ):

        records = extract_from_file(
            file_path
        )

        print(
            f"[{index}/{len(files)}] "
            f"{file_path.name}"
        )

        if records:

            subjects = {}

            for record in records:

                subject = record["subject"]

                subjects[subject] = (
                    subjects.get(subject, 0)
                    + 1
                )

            print(
                f"    -> {len(records)} questions"
            )

            for subject, count in subjects.items():

                print(
                    f"       {subject}: {count}"
                )

        else:

            print(
                "    -> 0 questions"
            )

        all_records.extend(records)

    # Remove exact duplicates.
    unique = []
    seen = set()

    for record in all_records:

        key = (
            record["semester"],
            record["subject"],
            record["question"].lower()
        )

        if key in seen:
            continue

        seen.add(key)
        unique.append(record)

    all_records = unique

    print()
    print("=" * 60)
    print(
        f"TOTAL SY QUESTIONS: {len(all_records)}"
    )
    print("=" * 60)
    print()

    subject_counts = {}

    for record in all_records:

        subject = record["subject"]

        subject_counts[subject] = (
            subject_counts.get(subject, 0)
            + 1
        )

    print("SUBJECT COUNTS:")

    for subject, count in sorted(
        subject_counts.items()
    ):

        print(
            f"  {subject}: {count}"
        )

    print()

    OUTPUT_FILE.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    with open(
        OUTPUT_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            all_records,
            file,
            indent=2,
            ensure_ascii=False
        )

    print(
        f"Saved to:\n{OUTPUT_FILE}"
    )

    print()


if __name__ == "__main__":
    main()