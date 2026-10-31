from pathlib import Path
import json

BASE_DIR = Path(__file__).resolve().parent

OCR_DIR = BASE_DIR / "dataset" / "ocr"
OUTPUT_DIR = BASE_DIR / "dataset" / "processed"
OUTPUT_FILE = OUTPUT_DIR / "sy_pyqs_demo.json"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

all_questions = []

for txt_file in OCR_DIR.rglob("*.txt"):

    # Only process SY folders
    if "SYBSc" not in txt_file.parent.name and "SYBSC" not in txt_file.parent.name:
        continue

    print(f"Reading: {txt_file}")

    try:
        with open(txt_file, "r", encoding="utf-8") as file:
            data = json.load(file)

        if not isinstance(data, list):
            print("  SKIPPED: file does not contain a JSON list")
            continue

        all_questions.extend(data)

        print(f"  Added: {len(data)} questions")

    except Exception as error:
        print(f"  ERROR: {error}")


# Keep only SY records
all_questions = [
    item
    for item in all_questions
    if str(item.get("year", "")).upper() == "SY"
]


# Keep only Semester 3 and 4
all_questions = [
    item
    for item in all_questions
    if item.get("semester") in [3, 4, "3", "4"]
]


# Give every record a unique ID
for index, item in enumerate(all_questions, start=1):
    item["id"] = index


with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        all_questions,
        file,
        ensure_ascii=False,
        indent=2
    )


print()
print("=" * 60)
print("SY DATASET CREATED")
print("=" * 60)

print(f"Total questions: {len(all_questions)}")
print(f"Saved to: {OUTPUT_FILE}")

print()
print("SUBJECT COUNTS:")

subject_counts = {}

for item in all_questions:

    subject = item.get(
        "subject",
        "Unknown"
    )

    subject_counts[subject] = (
        subject_counts.get(subject, 0) + 1
    )


for subject, count in sorted(subject_counts.items()):

    print(
        f"  {subject}: {count}"
    )